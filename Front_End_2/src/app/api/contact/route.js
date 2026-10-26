import { getConnection } from '@/lib/db';
import sql from 'mssql';
import { NextResponse } from 'next/server';
import { validatePartnershipContact, classifyContactError, generateFingerprint } from '@/lib/contact-input.mjs';

export const runtime = 'nodejs';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Dữ liệu yêu cầu không hợp lệ.' }, { status: 400 });
  }
  const validated = validatePartnershipContact(body);
  if (validated.error) return NextResponse.json({ error: validated.error }, { status: 400 });

  try {
    const { fullName, phoneNumber, email, message, submissionId } = validated.values;
    const ip = request.headers.get('x-sanitized-ip') || 'unknown';
    const fingerprint = generateFingerprint(phoneNumber, message);

    const pool = await getConnection();
    
    // Thực thi script SQL nguyên tử để chống Race Condition và tối ưu số lần gọi DB
    const result = await pool.request()
      .input('fullName', sql.NVarChar(100), fullName)
      .input('phoneNumber', sql.VarChar(15), phoneNumber)
      .input('email', sql.VarChar(100), email || '')
      .input('message', sql.NVarChar(sql.MAX), message || '')
      .input('submissionId', sql.UniqueIdentifier, submissionId)
      .input('fingerprint', sql.VarChar(64), fingerprint)
      .input('ipAddress', sql.VarChar(45), ip)
      .query(`
        SET NOCOUNT ON;
        
        -- 1. Check Rate Limits
        DECLARE @IpCount INT = (SELECT COUNT(*) FROM dbo.Consultations WHERE IpAddress = @ipAddress AND CreatedAt > DATEADD(minute, -10, SYSUTCDATETIME()));
        DECLARE @PhoneCount INT = (SELECT COUNT(*) FROM dbo.Consultations WHERE PhoneNumber = @phoneNumber AND CreatedAt > DATEADD(minute, -10, SYSUTCDATETIME()));
        
        IF @IpCount >= 5 OR @PhoneCount >= 3
        BEGIN
            SELECT 'RATE_LIMITED' AS Status;
            RETURN;
        END

        -- 2. Check Idempotency (SubmissionId)
        DECLARE @ExistingFingerprint VARCHAR(64);
        SELECT @ExistingFingerprint = Fingerprint FROM dbo.Consultations WHERE SubmissionId = @submissionId;
        IF @@ROWCOUNT > 0
        BEGIN
            IF @ExistingFingerprint = @fingerprint
                SELECT 'IDEMPOTENT_SUCCESS' AS Status;
            ELSE
                SELECT 'CONFLICT' AS Status;
            RETURN;
        END
        
        -- 3. Check Deduplication (Same Fingerprint in last 10 mins)
        IF EXISTS (SELECT 1 FROM dbo.Consultations WHERE Fingerprint = @fingerprint AND CreatedAt > DATEADD(minute, -10, SYSUTCDATETIME()))
        BEGIN
            SELECT 'DUPLICATE' AS Status;
            RETURN;
        END
        
        -- 4. Insert (Filtered Unique Index on SubmissionId acts as final barrier)
        INSERT INTO dbo.Consultations (FullName, PhoneNumber, Email, Message, SubmissionId, Fingerprint, IpAddress)
        VALUES (@fullName, @phoneNumber, @email, @message, @submissionId, @fingerprint, @ipAddress);
        
        SELECT 'INSERTED' AS Status;
      `);

    const dbStatus = result.recordset[0].Status;

    if (dbStatus === 'RATE_LIMITED') {
      return NextResponse.json({ error: 'Quá nhiều yêu cầu.' }, { status: 429, headers: { 'Retry-After': '600' } });
    }
    if (dbStatus === 'CONFLICT') {
      return NextResponse.json({ error: 'Nội dung không khớp với yêu cầu trước đó. Vui lòng tải lại trang.' }, { status: 409 });
    }
    if (dbStatus === 'DUPLICATE') {
      return NextResponse.json({ success: true, duplicate: true, message: 'Yêu cầu hợp tác đã được tiếp nhận.' });
    }

    return NextResponse.json({ success: true, message: 'Yêu cầu hợp tác đã được tiếp nhận.' });
  } catch (error) {
    const code = classifyContactError(error);
    
    // Nếu vướng lỗi Unique Constraint (2601) ở lớp cuối cùng do Race Condition, ta coi như thành công (Idempotent)
    if (code === 'CONTACT_DUPLICATE') {
      return NextResponse.json({ success: true, duplicate: true, message: 'Handled via unique constraint.' });
    }

    console.error('Contact submission failed', { code, databaseCode: error.code, number: error.number });
    return NextResponse.json({
      error: 'Chưa thể lưu yêu cầu hợp tác. Vui lòng thử lại sau. Thông tin bạn nhập vẫn được giữ nguyên.',
      code,
    }, { status: code === 'CONTACT_SAVE' ? 500 : 503 });
  }
}

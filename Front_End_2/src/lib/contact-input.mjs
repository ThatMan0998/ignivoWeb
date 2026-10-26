import crypto from 'crypto';

export function validateContact(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Dữ liệu yêu cầu không hợp lệ.' };
  const values = {};
  for (const key of ['fullName', 'phoneNumber', 'email', 'message', 'submissionId']) {
    if (body[key] != null && typeof body[key] !== 'string') return { error: 'Thông tin tư vấn phải là văn bản.' };
    values[key] = (body[key] ?? '').trim();
  }
  if (!values.fullName || !values.phoneNumber) return { error: 'Vui lòng nhập họ tên và số điện thoại.' };
  if (values.fullName.length > 100) return { error: 'Họ tên tối đa 100 ký tự.' };
  
  values.phoneNumber = values.phoneNumber.replace(/[\s().-]/g, '');
  if (!/^\+?\d{8,14}$/.test(values.phoneNumber)) return { error: 'Số điện thoại không hợp lệ.' };
  
  if (values.email.length > 100 || (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))) return { error: 'Email không hợp lệ hoặc vượt quá 100 ký tự.' };
  if (values.message.length > 5000) return { error: 'Nội dung tư vấn tối đa 5.000 ký tự.' };

  // Validate submissionId
  if (!values.submissionId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(values.submissionId)) {
    return { error: 'Yêu cầu không hợp lệ. Vui lòng tải lại trang và thử lại.' };
  }

  return { values };
}

const collaborationAreas = new Set(['distribution', 'technology', 'deployment', 'investment', 'other']);
const collaborationLabels = {
  distribution: 'Phân phối / đại lý',
  technology: 'Tích hợp công nghệ',
  deployment: 'Triển khai / lắp đặt',
  investment: 'Đầu tư / tài trợ',
  other: 'Khác',
};

export function validatePartnershipContact(body) {
  const contact = validateContact(body);
  if (contact.error) return contact;

  for (const key of ['partnerType', 'organizationName', 'role', 'collaborationArea']) {
    if (body[key] != null && typeof body[key] !== 'string') return { error: 'Thông tin hợp tác phải là văn bản.' };
  }

  const partnerType = (body.partnerType ?? '').trim();
  const organizationName = (body.organizationName ?? '').trim();
  const role = (body.role ?? '').trim();
  const collaborationArea = (body.collaborationArea ?? '').trim();

  if (!['company', 'individual'].includes(partnerType)) return { error: 'Vui lòng chọn công ty hoặc cá nhân.' };
  if (partnerType === 'company' && !organizationName) return { error: 'Vui lòng nhập tên công ty / tổ chức.' };
  if (organizationName.length > 150 || role.length > 100) return { error: 'Tên tổ chức hoặc vai trò quá dài.' };
  if (!collaborationAreas.has(collaborationArea)) return { error: 'Vui lòng chọn lĩnh vực hợp tác.' };
  if (!contact.values.email) return { error: 'Vui lòng nhập email liên hệ.' };
  if (!contact.values.message) return { error: 'Vui lòng mô tả đề xuất hợp tác.' };

  const details = [
    `Loại đối tác: ${partnerType === 'company' ? 'Công ty / tổ chức' : 'Cá nhân'}`,
    ...(partnerType === 'company' ? [`Công ty / tổ chức: ${organizationName}`] : []),
    ...(role ? [`Vai trò / chuyên môn: ${role}`] : []),
    `Lĩnh vực hợp tác: ${collaborationLabels[collaborationArea]}`,
    '',
    `Đề xuất hợp tác:\n${contact.values.message}`,
  ];
  const message = details.join('\n');
  if (message.length > 5000) return { error: 'Nội dung hợp tác tối đa 5.000 ký tự, bao gồm thông tin đối tác.' };

  return { values: { ...contact.values, message } };
}

export function generateFingerprint(phoneNumber, message) {
  const normalizedPhone = phoneNumber.replace(/[\s().-]/g, '').toLowerCase();
  const normalizedMessage = message.replace(/\s+/g, ' ').trim().toLowerCase();
  const payload = `${normalizedPhone}|${normalizedMessage}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

export function classifyContactError(error) {
  if (error.code === 'DB_CONFIG') return 'CONTACT_CONFIG';
  if (['ELOGIN', 'ESOCKET', 'ETIMEOUT', 'ECONNCLOSED', 'ENOTOPEN', 'EINSTLOOKUP'].includes(error.code)) return 'CONTACT_DATABASE';
  if (error.number === 208 || error.originalError?.info?.number === 208) return 'CONTACT_SCHEMA';
  // 2601 and 2627 are unique constraint violations in SQL Server
  if (error.number === 2601 || error.number === 2627) return 'CONTACT_DUPLICATE';
  return 'CONTACT_SAVE';
}

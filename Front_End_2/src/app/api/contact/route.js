import { getConnection } from '@/lib/db';
import sql from 'mssql';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, phoneNumber, email, message } = body;

    // Validate
    if (!fullName || !phoneNumber) {
      return NextResponse.json({ error: 'FullName and PhoneNumber are required.' }, { status: 400 });
    }

    const pool = await getConnection();
    
    // Insert into database
    await pool.request()
      .input('fullName', sql.NVarChar(100), fullName)
      .input('phoneNumber', sql.VarChar(15), phoneNumber)
      .input('email', sql.VarChar(100), email || '')
      .input('message', sql.NVarChar(sql.MAX), message || '')
      .query(`
        INSERT INTO Consultations (FullName, PhoneNumber, Email, Message)
        VALUES (@fullName, @phoneNumber, @email, @message)
      `);

    return NextResponse.json({ success: true, message: 'Consultation info saved successfully!' });
  } catch (error) {
    console.error('Error saving consultation info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

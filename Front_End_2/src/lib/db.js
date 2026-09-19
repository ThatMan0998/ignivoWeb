import sql from 'mssql';

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER || 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // For Azure, or if your local SQL Server requires it
    trustServerCertificate: true // Useful for local dev with self-signed certs (e.g., SSMS 2022)
  }
};

let appPool = null;

export async function getConnection() {
  if (appPool) {
    return appPool;
  }
  
  try {
    appPool = await sql.connect(sqlConfig);
    console.log('Connected to SQL Server Database');
    return appPool;
  } catch (err) {
    console.error('Database connection failed', err);
    throw err;
  }
}

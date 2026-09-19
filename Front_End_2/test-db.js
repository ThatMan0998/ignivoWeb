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

async function testConnection() {
  console.log('Attempting to connect with config:', {
    user: sqlConfig.user,
    server: sqlConfig.server,
    database: sqlConfig.database,
    // Do not log password!
  });
  
  try {
    let pool = await sql.connect(sqlConfig);
    console.log('✅ Successfully connected to SQL Server Database!');
    pool.close();
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error(err.message);
  }
}

testConnection();

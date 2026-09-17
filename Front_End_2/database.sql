-- Tạo bảng lưu thông tin tư vấn (Consultations)
CREATE TABLE Consultations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    Email VARCHAR(100) NULL,
    Message NVARCHAR(MAX) NULL,
    Status NVARCHAR(50) DEFAULT 'Pending', -- Trạng thái: Pending, Contacted, Cancelled
    CreatedAt DATETIME DEFAULT GETDATE()
);

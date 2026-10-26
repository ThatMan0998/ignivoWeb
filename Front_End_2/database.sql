-- Tạo bảng lưu thông tin tư vấn (Consultations) - Phiên bản mới
CREATE TABLE Consultations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    Email VARCHAR(100) NULL,
    Message NVARCHAR(MAX) NULL,
    Status NVARCHAR(50) DEFAULT 'Pending', -- Trạng thái: Pending, Contacted, Cancelled
    SubmissionId UNIQUEIDENTIFIER NULL,
    Fingerprint VARCHAR(64) NULL,
    IpAddress VARCHAR(45) NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);

-- ============================================================================
-- SCRIPT MIGRATION DÀNH CHO BẢNG ĐÃ TỒN TẠI (CHẠY TRÊN DATABASE HIỆN TẠI)
-- ============================================================================
/*
-- 1. Thêm các cột mới
ALTER TABLE Consultations ADD 
    SubmissionId UNIQUEIDENTIFIER NULL,
    Fingerprint VARCHAR(64) NULL,
    IpAddress VARCHAR(45) NULL;

-- 2. Đổi kiểu dữ liệu CreatedAt sang DATETIME2 (Tuỳ chọn nếu bảng cũ đang dùng DATETIME)
-- ALTER TABLE Consultations ALTER COLUMN CreatedAt DATETIME2;

-- 3. Cập nhật giá trị mặc định cho CreatedAt
ALTER TABLE Consultations ADD CONSTRAINT DF_Consultations_CreatedAt DEFAULT SYSUTCDATETIME() FOR CreatedAt;

-- 4. Tạo các Index cần thiết để tối ưu hiệu suất và chống spam/trùng lặp
-- Index cho SubmissionId (Bỏ qua các bản ghi cũ có SubmissionId = NULL)
CREATE UNIQUE NONCLUSTERED INDEX IX_Consultations_SubmissionId 
ON Consultations(SubmissionId) 
WHERE SubmissionId IS NOT NULL;

-- Index phục vụ Deduplication
CREATE NONCLUSTERED INDEX IX_Consultations_Fingerprint_CreatedAt 
ON Consultations(Fingerprint, CreatedAt);

-- Index phục vụ Rate Limiting theo IP
CREATE NONCLUSTERED INDEX IX_Consultations_IpAddress_CreatedAt 
ON Consultations(IpAddress, CreatedAt);

-- Index phục vụ Rate Limiting theo SĐT
CREATE NONCLUSTERED INDEX IX_Consultations_PhoneNumber_CreatedAt 
ON Consultations(PhoneNumber, CreatedAt);
*/

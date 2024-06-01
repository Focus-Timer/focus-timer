-- my-docker-sql/init/init.sql
USE [master];
GO

IF DB_ID('FocusTimer') IS NULL
BEGIN
    CREATE DATABASE FocusTimer;
END
GO

-- Change the password of the sa user
ALTER LOGIN sa WITH PASSWORD = 'NewStrongPassword123#';
GO

USE FocusTimer;
GO

BEGIN TRANSACTION;

BEGIN TRY

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    userid VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
);

CREATE TABLE report (
    id INT PRIMARY KEY IDENTITY(1,1),
    userid VARCHAR(255) NOT NULL,
    pomodoros INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(userid),
    CONSTRAINT CHK_Pomodoros CHECK (pomodoros > 0 AND pomodoros < 43) -- Max 43 pomodoros in a day 
);

-- Insert dummy data into the users table
INSERT INTO users (userid, username)
VALUES
('user01', 'Alice'),
('user02', 'Bob'),
('user03', 'Charlie'),
('user04', 'Diana'),
('user05', 'Eve');

-- Insert dummy data into the report table
INSERT INTO report (userid, pomodoros, date)
VALUES
-- Entries for user01
('user01', 1, '2024-06-02 08:30:00'),
('user01', 1, '2024-06-03 08:45:00'),
('user01', 2, '2024-06-04 09:00:00'),
('user01', 8, '2024-06-05 09:15:00'),
('user01', 3, '2024-06-06 09:30:00'),
('user01', 10, '2024-06-07 09:45:00'),
('user01', 15, '2024-06-08 10:00:00'),
('user01', 9, '2024-06-09 10:15:00'),
('user01', 5, '2024-06-10 10:30:00'),
('user01', 30, '2024-06-11 10:45:00'),

-- Entries for user02
('user02', 21, '2024-06-02 09:00:00'),
('user02', 8, '2024-06-03 09:15:00'),
('user02', 4, '2024-06-04 09:30:00'),
('user02', 3, '2024-06-05 09:45:00'),
('user02', 6, '2024-06-06 10:00:00'),
('user02', 12, '2024-06-07 10:15:00'),
('user02', 8, '2024-06-08 10:30:00'),
('user02', 4, '2024-06-09 10:45:00'),
('user02', 3, '2024-06-10 11:00:00'),
('user02', 11, '2024-06-11 11:15:00'),

-- Entries for user03
('user03', 4, '2024-06-02 09:30:00'),
('user03', 21, '2024-06-03 09:45:00'),
('user03', 28, '2024-06-04 10:00:00'),
('user03', 35, '2024-06-05 10:15:00'),
('user03', 40, '2024-06-06 10:30:00'),
('user03', 14, '2024-06-07 10:45:00'),
('user03', 21, '2024-06-08 11:00:00'),
('user03', 28, '2024-06-09 11:15:00'),
('user03', 5, '2024-06-10 11:30:00'),
('user03', 4, '2024-06-11 11:45:00'),

-- Entries for user04
('user04', 6, '2024-06-02 10:00:00'),
('user04', 22, '2024-06-03 10:15:00'),
('user04', 30, '2024-06-04 10:30:00'),
('user04', 32, '2024-06-05 10:45:00'),
('user04', 3, '2024-06-06 11:00:00'),
('user04', 16, '2024-06-07 11:15:00'),
('user04', 22, '2024-06-08 11:30:00'),
('user04', 3, '2024-06-09 11:45:00'),
('user04', 2, '2024-06-10 12:00:00'),
('user04', 8, '2024-06-11 12:15:00'),

-- Entries for user05
('user05', 18, '2024-06-02 10:30:00'),
('user05', 20, '2024-06-03 10:45:00'),
('user05', 25, '2024-06-04 11:00:00'),
('user05', 3, '2024-06-05 11:15:00'),
('user05', 9, '2024-06-06 11:30:00'),
('user05', 1, '2024-06-07 11:45:00'),
('user05', 20, '2024-06-08 12:00:00'),
('user05', 5, '2024-06-09 12:15:00'),
('user05', 3, '2024-06-10 12:30:00'),
('user05', 9, '2024-06-11 12:45:00');

-- Provision user access to the database
-- Step 1: Create a Login
CREATE LOGIN db_user WITH PASSWORD = 'StrongPassword123*';

-- Step 2: Create a User in the Database
CREATE USER db_user FOR LOGIN db_user;

-- Step 3: Grant the Necessary Permissions
-- Granting SELECT, INSERT, UPDATE, and DELETE permissions on the users table
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.users TO db_user;

-- Granting SELECT, INSERT, UPDATE, and DELETE permissions on the report table
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.report TO db_user;

COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    -- If there is an error, rollback the transaction
    ROLLBACK TRANSACTION;
    -- Optionally, display the error
    DECLARE @ErrorMessage NVARCHAR(4000);
    SET @ErrorMessage = ERROR_MESSAGE();
    RAISERROR (@ErrorMessage, 16, 1);
END CATCH;

GO
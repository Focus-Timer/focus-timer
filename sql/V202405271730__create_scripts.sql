USE FocusTimer;
GO

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    userid VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
);

CREATE TABLE report (
    id INT PRIMARY KEY IDENTITY(1,1),
    userid VARCHAR(255) NOT NULL,
    pomodoros DECIMAL(4,2) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(userid),
    CONSTRAINT CHK_Pomodoros CHECK (pomodoros > 0 AND pomodoros < 44.00) -- Max 44 pomodoros in a day 
);
USE FocusTimer;
GO

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    userid VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(350) NOT NULL UNIQUE
);

CREATE TABLE report (
    id INT PRIMARY KEY IDENTITY(1,1),
    userid VARCHAR(255) NOT NULL,
    pomodoros INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(userid),
    CONSTRAINT CHK_Pomodoros CHECK (pomodoros > 0 AND pomodoros < 43) -- Max 43 pomodoros in a day 
);
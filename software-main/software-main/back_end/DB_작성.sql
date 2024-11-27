-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS software;
USE software;

-- UserData 테이블 생성
CREATE TABLE UserData (
    uid INT PRIMARY KEY AUTO_INCREMENT,
    nickName CHAR(10),
    loginID VARCHAR(50) UNIQUE,
    apiId SMALLINT,
    password CHAR(20),
    login_method TINYINT
);

-- Post 테이블 생성
CREATE TABLE Post (
    pid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20),
    category CHAR(10),
    postStatus CHAR(10),
    image VARCHAR(50),
    details CHAR(100)
);

-- VetInfo 테이블 생성
CREATE TABLE VetInfo (
    VetID INT PRIMARY KEY AUTO_INCREMENT,
    Vetname VARCHAR(50),
    Vetaddress VARCHAR(100),
    district VARCHAR(2),
    VetphoneNumber VARCHAR(15),
    Vetopen24Hours TINYINT
);

-- Comment 테이블 생성
CREATE TABLE Comment (
    commentID INT PRIMARY KEY AUTO_INCREMENT,
    commenter INT,
    comment CHAR(200),
    time DATETIME,
    FOREIGN KEY (commenter) REFERENCES UserData(uid)
);

-- CommentReport 테이블 생성
CREATE TABLE CommentReport (
    reportNumber INT PRIMARY KEY AUTO_INCREMENT,
    commentID INT,
    reporterID INT,
    reportedUserID INT,
    reportReason VARCHAR(255),
    reportDate DATETIME,
    status TINYINT,
    systemAction VARCHAR(255),
    reportCount INT,
    FOREIGN KEY (commentID) REFERENCES Comment(commentID),
    FOREIGN KEY (reporterID) REFERENCES UserData(uid),
    FOREIGN KEY (reportedUserID) REFERENCES UserData(uid)
);

-- chatSummary 테이블 생성
CREATE TABLE chatSummary (
    chatID INT PRIMARY KEY AUTO_INCREMENT,
    receiverID INT,
    lastMessageTime TIMESTAMP,
    isUnread BOOLEAN,
    adminChatID VARCHAR(50),
    timeStamp TIMESTAMP,
    FOREIGN KEY (receiverID) REFERENCES UserData(uid)
);

-- Notification 테이블 생성
CREATE TABLE Notification (
    notificationID INT PRIMARY KEY AUTO_INCREMENT,
    alertType ENUM('comment', 'report'),
    pid INT,
    commentID INT,
    reportReason VARCHAR(255),
    message VARCHAR(255),
    isUnRead BOOLEAN,
    timestamp DATETIME,
    FOREIGN KEY (pid) REFERENCES Post(pid),
    FOREIGN KEY (commentID) REFERENCES Comment(commentID)
);

-- Message 테이블 생성
CREATE TABLE Message (
    messageID INT PRIMARY KEY AUTO_INCREMENT,
    chatID INT,
    senderID INT,
    receiverID INT,
    messageContent TEXT,
    timeStamp TIMESTAMP,
    FOREIGN KEY (chatID) REFERENCES chatSummary(chatID),
    FOREIGN KEY (senderID) REFERENCES UserData(uid),
    FOREIGN KEY (receiverID) REFERENCES UserData(uid)
);

-- 데이터베이스 내의 테이블 목록 조회
SHOW TABLES;

-- 데이터베이스 목록 조회
SHOW DATABASES;

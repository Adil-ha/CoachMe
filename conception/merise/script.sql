CREATE DATABASE IF NOT EXISTS coachme;

USE coachme;

CREATE TABLE T_User (
    U_idUser INT AUTO_INCREMENT,
    U_name VARCHAR(50) NOT NULL,
    U_email VARCHAR(50) NOT NULL UNIQUE,
    U_password VARCHAR(255) NOT NULL, -- Increased length for hashed passwords
    U_phone VARCHAR(15),
    U_role ENUM('ROLE_ADMIN', 'ROLE_USER') NOT NULL,
    PRIMARY KEY (U_idUser)
);

CREATE TABLE T_Address (
    A_idAddress INT AUTO_INCREMENT,
    A_number VARCHAR(10) NOT NULL,
    A_street VARCHAR(255) NOT NULL,
    A_town VARCHAR(100) NOT NULL,
    A_code VARCHAR(20) NOT NULL,
    A_country VARCHAR(100) NOT NULL,
    U_idUser INT NOT NULL,
    PRIMARY KEY (A_idAddress),
    FOREIGN KEY (U_idUser) REFERENCES T_User (U_idUser) ON DELETE CASCADE
);

CREATE TABLE T_Jwt (
    J_idJwt INT AUTO_INCREMENT,
    J_value VARCHAR(255) NOT NULL,
    J_is_disable BOOLEAN NOT NULL,
    J_is_expirate BOOLEAN NOT NULL,
    U_idUser INT NOT NULL,
    PRIMARY KEY (J_idJwt),
    FOREIGN KEY (U_idUser) REFERENCES T_User (U_idUser) ON DELETE CASCADE
);

CREATE TABLE T_Performance (
    P_idPerformance INT AUTO_INCREMENT,
    P_type VARCHAR(50) NOT NULL UNIQUE,
    P_description VARCHAR(300) NOT NULL,
    P_image VARCHAR(255),
    PRIMARY KEY (P_idPerformance)
);

CREATE TABLE T_Coaching_Request (
    CR_idCoaching_request INT AUTO_INCREMENT,
    CR_type ENUM(
        'home',
        'outdoor',
        'videoconference'
    ) NOT NULL,
    CR_requestDateTime DATETIME NOT NULL,
    CR_status ENUM(
        'pending',
        'confirmed',
        'canceled'
    ) NOT NULL,
    U_idUser INT NOT NULL,
    P_idPerformance INT NOT NULL,
    PRIMARY KEY (CR_idCoaching_request),
    FOREIGN KEY (U_idUser) REFERENCES T_User (U_idUser) ON DELETE CASCADE,
    FOREIGN KEY (P_idPerformance) REFERENCES T_Performance (P_idPerformance) ON DELETE CASCADE
);

CREATE TABLE T_Book (
    B_idBook INT AUTO_INCREMENT,
    B_title VARCHAR(100) NOT NULL UNIQUE,
    B_author VARCHAR(50) NOT NULL,
    B_price DECIMAL(10, 2) NOT NULL,
    B_description VARCHAR(500) NOT NULL,
    B_image VARCHAR(255) NOT NULL,
    PRIMARY KEY (B_idBook)
);

CREATE TABLE T_Order (
    O_idOrder INT AUTO_INCREMENT,
    O_orderDate DATETIME NOT NULL,
    O_status ENUM(
        'pending',
        'in progress',
        'delivered'
    ) NOT NULL,
    U_idUser INT NOT NULL,
    PRIMARY KEY (O_idOrder),
    FOREIGN KEY (U_idUser) REFERENCES T_User (U_idUser) ON DELETE CASCADE
);

CREATE TABLE T_Order_Detail (
    OD_idOrder_detail INT AUTO_INCREMENT,
    OD_quantity SMALLINT NOT NULL,
    B_idBook INT NOT NULL,
    O_idOrder INT NOT NULL,
    PRIMARY KEY (OD_idOrder_detail),
    FOREIGN KEY (B_idBook) REFERENCES T_Book (B_idBook) ON DELETE CASCADE,
    FOREIGN KEY (O_idOrder) REFERENCES T_Order (O_idOrder) ON DELETE CASCADE
);

CREATE TABLE T_Cart (
    C_idCart INT AUTO_INCREMENT,
    U_idUser INT NOT NULL,
    PRIMARY KEY (C_idCart),
    FOREIGN KEY (U_idUser) REFERENCES T_User (U_idUser) ON DELETE CASCADE
);

CREATE TABLE T_Cart_Detail (
    CD_idCart_detail INT AUTO_INCREMENT,
    CD_quantity SMALLINT NOT NULL,
    C_idCart INT NOT NULL,
    B_idBook INT NOT NULL,
    PRIMARY KEY (CD_idCart_detail),
    FOREIGN KEY (C_idCart) REFERENCES T_Cart (C_idCart) ON DELETE CASCADE,
    FOREIGN KEY (B_idBook) REFERENCES T_Book (B_idBook) ON DELETE CASCADE
);
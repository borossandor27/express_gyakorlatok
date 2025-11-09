-- ==========================================
-- Tesztadatbázis létrehozása: userdb
-- ==========================================

DROP DATABASE IF EXISTS userdb;
CREATE DATABASE userdb CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE userdb;

-- ==========================================
-- Tábla: roles (felhasználói szerepkörök)
-- ==========================================
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

INSERT INTO roles (role_name) VALUES
('admin'),
('moderator'),
('user');

-- ==========================================
-- Tábla: users (felhasználók)
-- ==========================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO users (name, email, password, role_id, active) VALUES
('Kiss Anna', 'anna.kiss@example.com', 'pass123', 3, TRUE),
('Nagy Béla', 'bela.nagy@example.com', 'pass456', 2, TRUE),
('Tóth Csilla', 'csilla.toth@example.com', 'pass789', 3, TRUE),
('Farkas Dániel', 'daniel.farkas@example.com', 'pass111', 1, TRUE),
('Horváth Erika', 'erika.horvath@example.com', 'pass222', 2, FALSE),
('Molnár Ferenc', 'ferenc.molnar@example.com', 'pass333', 3, TRUE),
('Balogh Gábor', 'gabor.balogh@example.com', 'pass444', 3, TRUE),
('Szabó Hajnalka', 'hajnalka.szabo@example.com', 'pass555', 1, TRUE),
('Varga István', 'istvan.varga@example.com', 'pass666', 2, TRUE),
('Németh Júlia', 'julia.nemeth@example.com', 'pass777', 3, FALSE);

-- ==========================================
-- Tábla: logins (belépési napló)
-- ==========================================
CREATE TABLE logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO logins (user_id, success) VALUES
(1, TRUE),
(2, TRUE),
(2, FALSE),
(3, TRUE),
(4, TRUE),
(4, TRUE),
(5, FALSE),
(6, TRUE),
(7, TRUE),
(8, TRUE),
(9, TRUE),
(10, FALSE);

-- ==========================================
-- Nézet: aktív felhasználók listája
-- ==========================================
CREATE OR REPLACE VIEW active_users AS
SELECT 
    u.id,
    u.name,
    u.email,
    r.role_name,
    u.created_at
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.active = TRUE;

-- ==========================================
-- Példa: statisztikai lekérdezés (gyakorláshoz)
-- ==========================================
-- SELECT r.role_name, COUNT(u.id) AS user_count
-- FROM users u
-- JOIN roles r ON u.role_id = r.id
-- WHERE u.active = TRUE
-- GROUP BY r.role_name
-- HAVING user_count > 1
-- ORDER BY user_count DESC;

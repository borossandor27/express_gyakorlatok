CREATE DATABASE IF NOT EXISTS gyumolcsok;
USE gyumolcsok;

-- Gyümölcsök tábla
CREATE TABLE IF NOT EXISTS gyumolcs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(50) NOT NULL,
    megjegyzes TEXT
);

-- Készlet tábla
CREATE TABLE IF NOT EXISTS keszlet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gyumolcs_id INT NOT NULL,
    mennyiseg INT NOT NULL,
    FOREIGN KEY (gyumolcs_id) REFERENCES gyumolcs(id) ON DELETE CASCADE
);

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

-- Gyümölcsök beszúrása
INSERT INTO gyumolcs (nev, megjegyzes) VALUES
('Alma', 'Piros alma, érett'),
('Körte', 'Sárga, édes ízű'),
('Banán', 'Trópusi gyümölcs, sárga'),
('Narancs', 'Lédús, C-vitaminban gazdag'),
('Szőlő', 'Zöld és fekete fajták is'),
('Eper', 'Friss, lokális termesztésű'),
('Málna', 'Vadon termő, édes-savas'),
('Szeder', 'Fekete, érett'),
('Citrom', 'Savanyú, főzéshez és teához'),
('Dinnye', 'Nyaranta friss, vízben gazdag');

-- Készlet adatok beszúrása
INSERT INTO `keszlet` (`gyumolcs_id`, `mennyiseg`) VALUES
(2, 94),
(1, 150),
(2, 75),
(3, 200),
(4, 120),
(5, 300),
(6, 50),
(7, 40),
(8, 35),
(9, 90),
(10, 25),
(4, 324),
(5, 255),
(6, -22),
(9, -21);

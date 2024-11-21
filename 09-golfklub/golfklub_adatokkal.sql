-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 21. 15:54
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `golfklub`
--
CREATE DATABASE IF NOT EXISTS `golfklub` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `golfklub`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `befizetesek`
--

DROP TABLE IF EXISTS `befizetesek`;
CREATE TABLE `befizetesek` (
  `uazon` bigint(20) UNSIGNED NOT NULL,
  `bido` datetime NOT NULL,
  `bosszeg` int(11) NOT NULL,
  `bmod` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `befizetesek`
--

INSERT INTO `befizetesek` (`uazon`, `bido`, `bosszeg`, `bmod`) VALUES
(1, '2024-11-01 10:15:00', 15000, 'Bankkártya'),
(2, '2024-11-02 14:30:00', 20000, 'Készpénz'),
(3, '2024-11-03 09:00:00', 18000, 'Banki átutalás'),
(4, '2024-11-05 11:20:00', 22000, 'Készpénz'),
(5, '2024-11-06 15:50:00', 17500, 'Banki átutalás'),
(6, '2024-11-07 09:10:00', 19000, 'Bankkártya'),
(4, '2024-11-08 10:30:00', 15000, 'Készpénz');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jelenlet`
--

DROP TABLE IF EXISTS `jelenlet`;
CREATE TABLE `jelenlet` (
  `uazon` bigint(20) UNSIGNED NOT NULL,
  `jerkezett` datetime NOT NULL,
  `jtavozott` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `jelenlet`
--

INSERT INTO `jelenlet` (`uazon`, `jerkezett`, `jtavozott`) VALUES
(1, '2024-11-10 08:00:00', '2024-11-10 12:00:00'),
(2, '2024-11-11 09:15:00', '2024-11-11 13:45:00'),
(3, '2024-11-12 07:30:00', NULL),
(4, '2024-11-12 08:15:00', '2024-11-12 11:45:00'),
(5, '2024-11-13 07:50:00', '2024-11-13 12:00:00'),
(6, '2024-11-14 09:00:00', NULL),
(1, '2024-11-15 10:00:00', '2024-11-15 13:30:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tagsagok`
--

DROP TABLE IF EXISTS `tagsagok`;
CREATE TABLE `tagsagok` (
  `uazon` bigint(20) UNSIGNED NOT NULL,
  `tkezdet` date NOT NULL,
  `tveg` date DEFAULT NULL,
  `tszint` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tagsagok`
--

INSERT INTO `tagsagok` (`uazon`, `tkezdet`, `tveg`, `tszint`) VALUES
(1, '2024-01-01', '2024-12-31', 'Arany'),
(2, '2024-02-01', NULL, 'Ezüst'),
(3, '2023-01-01', '2024-01-31', 'Bronz'),
(4, '2023-05-01', '2024-05-01', 'Ezüst'),
(5, '2024-03-01', NULL, 'Bronz'),
(6, '2022-01-01', '2024-01-01', 'Arany'),
(1, '2025-01-01', NULL, 'Gyémánt');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ugyfelek`
--

DROP TABLE IF EXISTS `ugyfelek`;
CREATE TABLE `ugyfelek` (
  `uazon` bigint(20) UNSIGNED NOT NULL,
  `unev` varchar(1024) NOT NULL,
  `uemail` varchar(1024) NOT NULL,
  `utel` varchar(1024) NOT NULL,
  `ujelszo` varchar(1024) NOT NULL,
  `uszuletett` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ugyfelek`
--

INSERT INTO `ugyfelek` (`uazon`, `unev`, `uemail`, `utel`, `ujelszo`, `uszuletett`) VALUES
(1, 'Kovács János', 'janos.kovacs@example.com', '+36201234567', 'hashedpassword123', '1985-03-15'),
(2, 'Nagy Anna', 'anna.nagy@example.com', '+36207654321', 'securepassword456', '1990-06-24'),
(3, 'Szabó Péter', 'peter.szabo@example.com', '+36209876543', 'mypassword789', '1978-12-05'),
(4, 'Tóth Márta', 'marta.toth@example.com', '+36203456789', 'password1234', '1988-07-22'),
(5, 'Kiss László', 'laszlo.kiss@example.com', '+36205678901', 'secure789', '1980-05-11'),
(6, 'Farkas Eszter', 'eszter.farkas@example.com', '+36201234987', 'anotherpassword', '1995-09-09'),
(7, 'Varga Zoltán', 'zoltan.varga@example.com', '+36207890123', 'zoltanpass', '1982-02-18');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `befizetesek`
--
ALTER TABLE `befizetesek`
  ADD KEY `befizetesek-ugyfelek` (`uazon`);

--
-- A tábla indexei `jelenlet`
--
ALTER TABLE `jelenlet`
  ADD KEY `jelenlet-ugyfelek` (`uazon`);

--
-- A tábla indexei `tagsagok`
--
ALTER TABLE `tagsagok`
  ADD KEY `tagsagok-ugyfelek` (`uazon`);

--
-- A tábla indexei `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD PRIMARY KEY (`uazon`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  MODIFY `uazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `befizetesek`
--
ALTER TABLE `befizetesek`
  ADD CONSTRAINT `befizetesek-ugyfelek` FOREIGN KEY (`uazon`) REFERENCES `ugyfelek` (`uazon`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `jelenlet`
--
ALTER TABLE `jelenlet`
  ADD CONSTRAINT `jelenlet-ugyfelek` FOREIGN KEY (`uazon`) REFERENCES `ugyfelek` (`uazon`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `tagsagok`
--
ALTER TABLE `tagsagok`
  ADD CONSTRAINT `tagsagok-ugyfelek` FOREIGN KEY (`uazon`) REFERENCES `ugyfelek` (`uazon`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

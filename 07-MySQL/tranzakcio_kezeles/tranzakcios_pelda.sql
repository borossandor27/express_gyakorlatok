-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 18. 15:52
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
-- Adatbázis: `tranzakcios_pelda`
--
CREATE DATABASE IF NOT EXISTS `tranzakcios_pelda` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tranzakcios_pelda`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szamlak`
--

CREATE TABLE `szamlak` (
  `szamla_id` bigint(20) UNSIGNED NOT NULL,
  `tulajdonos_nev` varchar(100) NOT NULL,
  `egyenleg` decimal(15,2) NOT NULL DEFAULT 0.00 CHECK (`egyenleg` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szamlak`
--

INSERT INTO `szamlak` (`szamla_id`, `tulajdonos_nev`, `egyenleg`) VALUES
(1, 'Kovács Ádám', 1500.00),
(2, 'Nagy Réka', 500.00),
(3, 'Tóth Zoltán', 0.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tranzakciok`
--

CREATE TABLE `tranzakciok` (
  `tranzakcio_id` bigint(20) UNSIGNED NOT NULL,
  `forras_szamla_id` int(11) DEFAULT NULL,
  `cel_szamla_id` int(11) DEFAULT NULL,
  `osszeg` decimal(15,2) NOT NULL,
  `ido` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `szamlak`
--
ALTER TABLE `szamlak`
  ADD PRIMARY KEY (`szamla_id`);

--
-- A tábla indexei `tranzakciok`
--
ALTER TABLE `tranzakciok`
  ADD PRIMARY KEY (`tranzakcio_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `szamlak`
--
ALTER TABLE `szamlak`
  MODIFY `szamla_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `tranzakciok`
--
ALTER TABLE `tranzakciok`
  MODIFY `tranzakcio_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

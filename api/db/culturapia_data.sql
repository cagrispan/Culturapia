-- phpMyAdmin SQL Dump
-- version 4.3.7
-- http://www.phpmyadmin.net
--
-- Host: mysql04-farm68.kinghost.net
-- Tempo de geração: 27/05/2017 às 19:16
-- Versão do servidor: 5.6.35-log
-- Versão do PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `culturapia02`
--

--
-- Fazendo dump de dados para tabela `admins`
--

INSERT INTO `admins` (`adminId`, `name`, `email`, `password`) VALUES
(1, 'Fabiano', 'fabcaron@hotmail.com', '01ec8f9d8a3ebd43fc698ccdeaa15c3f'),
(2, 'Carlos', 'cagrispan@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Fazendo dump de dados para tabela `styles`
--

INSERT INTO `styles` (`styleId`, `style`) VALUES
  (1, 'samba'),
  (2, 'pop'),
  (3, 'rock'),
  (5, 'sertanejo'),
  (6, 'rap'),
  (7, 'jazz');
  ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

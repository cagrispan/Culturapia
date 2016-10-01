-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 01-Out-2016 às 14:46
-- Versão do servidor: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `culturapia`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `audios`
--

CREATE TABLE `audios` (
  `bandId` int(11) NOT NULL,
  `audio` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `bands`
--

CREATE TABLE `bands` (
  `bandId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `about` text NOT NULL,
  `foundation` datetime NOT NULL,
  `city` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `bands`
--

INSERT INTO `bands` (`bandId`, `name`, `about`, `foundation`, `city`, `state`, `phone`, `email`) VALUES
(7, 'AC/DC', 'Banda de Rock Australiana.', '2016-09-06 03:00:00', 1, 1, '987654321', 'acdc@acdc.com');

-- --------------------------------------------------------

--
-- Estrutura da tabela `influences`
--

CREATE TABLE `influences` (
  `bandId` int(11) NOT NULL,
  `influence` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `influences`
--

INSERT INTO `influences` (`bandId`, `influence`) VALUES
(7, 'elvis'),
(7, 'jhonny cash');

-- --------------------------------------------------------

--
-- Estrutura da tabela `members`
--

CREATE TABLE `members` (
  `bandId` int(11) NOT NULL,
  `member` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `members`
--

INSERT INTO `members` (`bandId`, `member`) VALUES
(7, 'andré'),
(7, 'fabiano'),
(7, 'carlos');

-- --------------------------------------------------------

--
-- Estrutura da tabela `notices`
--

CREATE TABLE `notices` (
  `noticeId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `notice` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `notices`
--

INSERT INTO `notices` (`noticeId`, `bandId`, `notice`, `date`, `isDeleted`) VALUES
(17, 7, 'Bem vindo à nova página do AC/DC', '2016-09-26 13:08:34', 1),
(16, 7, 'Bem vindo à nova página do AC/BC', '2016-09-26 13:08:09', 1),
(15, 7, 'Bom dia Galera!', '2016-09-26 13:07:53', 1),
(18, 7, 'Querem saber as novidade de hoje?', '2016-09-26 13:12:23', 1),
(19, 7, 'Bom dia Galera!', '2016-09-26 13:13:17', 0),
(20, 7, 'Bem vindos à nova página do AC/DC', '2016-09-26 13:13:30', 0),
(21, 7, 'Querem saber as novidades de Hoje??', '2016-09-26 13:13:41', 0),
(22, 7, 'Um novo texto', '2016-09-26 21:06:54', 1),
(23, 7, 'kdsajfhkdsjdf', '2016-09-29 01:49:13', 1),
(24, 7, 'fsçldakhjflsdkdkf', '2016-09-29 01:49:16', 1),
(25, 7, 'asd;lfkn;ldskndflçkds', '2016-09-29 01:49:19', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `photos`
--

CREATE TABLE `photos` (
  `bandId` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `styles`
--

CREATE TABLE `styles` (
  `bandId` int(11) NOT NULL,
  `style` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `styles`
--

INSERT INTO `styles` (`bandId`, `style`) VALUES
(7, 'rock'),
(7, 'folk'),
(7, 'country');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `facebookId` varchar(255) NOT NULL,
  `facebookToken` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`userId`, `facebookId`, `facebookToken`, `name`, `phone`, `email`) VALUES
(4, '10209681138732632', 'EAADJZAKpUttgBADZBUXb7tFcmUygkwcHiXygC5o89Y7vQAJNFC3m0kke14gBh6E4H1XTKWNZAw4ZCuATO2hlRdZC11jit9OKZCGbvjT1bus0L9PaXfBF7hZCmPQ0yoCu7R3kK49pDZBrMeoNso8UkzqYduqCMV9o0ZCp4SvgnZBmwfjAZDZD', 'Carlos Augusto Grispan', '', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usersbands`
--

CREATE TABLE `usersbands` (
  `bandId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usersbands`
--

INSERT INTO `usersbands` (`bandId`, `userId`) VALUES
(7, '10209681138732632');

-- --------------------------------------------------------

--
-- Estrutura da tabela `videos`
--

CREATE TABLE `videos` (
  `bandId` int(11) NOT NULL,
  `videoId` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `videos`
--

INSERT INTO `videos` (`bandId`, `videoId`, `isDeleted`, `title`) VALUES
(7, 'pAgnJDJN4VA', 0, 'Back in Black'),
(7, 'gEPmA3USJdI', 0, 'skjdhsd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bands`
--
ALTER TABLE `bands`
  ADD PRIMARY KEY (`bandId`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`noticeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `facebookId` (`facebookId`);

--
-- Indexes for table `usersbands`
--
ALTER TABLE `usersbands`
  ADD PRIMARY KEY (`bandId`,`userId`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`bandId`,`videoId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bands`
--
ALTER TABLE `bands`
  MODIFY `bandId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `noticeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

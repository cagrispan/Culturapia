-- phpMyAdmin SQL Dump
-- version 4.3.7
-- http://www.phpmyadmin.net
--
-- Host: mysql04-farm68.kinghost.net
-- Tempo de geração: 02/02/2018 às 20:56
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

-- --------------------------------------------------------

--
-- Estrutura para tabela `admins`
--

CREATE TABLE IF NOT EXISTS `admins` (
  `adminId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `admins`
--

INSERT INTO `admins` (`adminId`, `name`, `email`, `password`) VALUES
(1, 'Fabiano', 'fabcaron@hotmail.com', '01ec8f9d8a3ebd43fc698ccdeaa15c3f'),
(2, 'Carlos', 'cagrispan@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055');

-- --------------------------------------------------------

--
-- Estrutura para tabela `alternatives`
--

CREATE TABLE IF NOT EXISTS `alternatives` (
  `alternativeId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `bandId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `audios`
--

CREATE TABLE IF NOT EXISTS `audios` (
  `bandId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `audioId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `isReported` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `bands`
--

CREATE TABLE IF NOT EXISTS `bands` (
  `bandId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `about` text NOT NULL,
  `foundation` datetime NOT NULL,
  `city` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `isReported` tinyint(1) NOT NULL DEFAULT '0',
  `type` int(1) NOT NULL DEFAULT '1',
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `preApprovalCode` varchar(255) DEFAULT NULL,
  `donationEmail` varchar(254) DEFAULT NULL,
  `allowDownload` tinyint(1) NOT NULL DEFAULT '0',
  `showContact` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `bandStyles`
--

CREATE TABLE IF NOT EXISTS `bandStyles` (
  `bandId` int(11) NOT NULL,
  `style` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `bandTypes`
--

CREATE TABLE IF NOT EXISTS `bandTypes` (
  `typeId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `audio` int(11) NOT NULL,
  `video` int(11) NOT NULL,
  `photo` int(11) NOT NULL,
  `quiz` tinyint(1) NOT NULL,
  `calendar` tinyint(1) NOT NULL,
  `stats` tinyint(1) NOT NULL DEFAULT '0',
  `donation` tinyint(1) NOT NULL DEFAULT '0',
  `quizSize` int(11) NOT NULL DEFAULT '5',
  `alternativeSize` int(11) NOT NULL DEFAULT '5'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `bandTypes`
--

INSERT INTO `bandTypes` (`typeId`, `type`, `audio`, `video`, `photo`, `quiz`, `calendar`, `stats`, `donation`, `quizSize`, `alternativeSize`) VALUES
(1, 'free', 1, 1, 1, 1, 1, 0, 0, 5, 5),
(2, 'premium', 3, 3, 3, 1, 1, 1, 1, 5, 5),
(3, 'vip', 3, 3, 3, 1, 1, 1, 1, 5, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `eventId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text NOT NULL,
  `bandId` int(11) NOT NULL,
  `local` varchar(1024) NOT NULL,
  `isReported` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `influences`
--

CREATE TABLE IF NOT EXISTS `influences` (
  `bandId` int(11) NOT NULL,
  `influence` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `likeId` int(11) NOT NULL,
  `photoId` int(11) DEFAULT NULL,
  `videoId` varchar(255) DEFAULT NULL,
  `audioId` int(11) DEFAULT NULL,
  `noticeId` int(11) DEFAULT NULL,
  `eventId` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `likeDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `unliked` tinyint(1) NOT NULL,
  `bandId` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `neighborhood` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `bandId` int(11) NOT NULL,
  `member` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `notices`
--

CREATE TABLE IF NOT EXISTS `notices` (
  `noticeId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `notice` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `isReported` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `photoId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(1024) NOT NULL,
  `isReported` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `profilePics`
--

CREATE TABLE IF NOT EXISTS `profilePics` (
  `profilePictureId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `isReported` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `questionId` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `bandId` int(11) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `isReported` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `reports`
--

CREATE TABLE IF NOT EXISTS `reports` (
  `reportId` int(11) NOT NULL,
  `photoId` int(11) DEFAULT NULL,
  `videoId` varchar(255) DEFAULT NULL,
  `questionId` int(11) DEFAULT NULL,
  `noticeId` int(11) DEFAULT NULL,
  `eventId` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `reportDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bandId` int(11) NOT NULL,
  `profilePictureId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `response`
--

CREATE TABLE IF NOT EXISTS `response` (
  `userId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `alternativeId` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `styles`
--

CREATE TABLE IF NOT EXISTS `styles` (
  `styleId` int(11) NOT NULL,
  `style` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `styles`
--

INSERT INTO `styles` (`styleId`, `style`) VALUES
(1, 'samba'),
(2, 'blues'),
(3, 'rock'),
(5, 'sertanejo'),
(6, 'rap'),
(7, 'jazz'),
(8, 'pop');

-- --------------------------------------------------------

--
-- Estrutura para tabela `userResponses`
--

CREATE TABLE IF NOT EXISTS `userResponses` (
  `responseId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `alternativeId` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `facebookToken` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birthday` timestamp NULL DEFAULT NULL,
  `cep` int(8) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(255) NOT NULL,
  `accepted` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usersBands`
--

CREATE TABLE IF NOT EXISTS `usersBands` (
  `bandId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
  `bandId` int(11) NOT NULL,
  `videoId` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL,
  `style` varchar(255) NOT NULL,
  `band` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `isReported` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`adminId`);

--
-- Índices de tabela `alternatives`
--
ALTER TABLE `alternatives`
  ADD PRIMARY KEY (`alternativeId`);

--
-- Índices de tabela `audios`
--
ALTER TABLE `audios`
  ADD PRIMARY KEY (`audioId`);

--
-- Índices de tabela `bands`
--
ALTER TABLE `bands`
  ADD PRIMARY KEY (`bandId`);

--
-- Índices de tabela `bandTypes`
--
ALTER TABLE `bandTypes`
  ADD PRIMARY KEY (`typeId`);

--
-- Índices de tabela `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventId`);

--
-- Índices de tabela `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`likeId`);

--
-- Índices de tabela `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`noticeId`);

--
-- Índices de tabela `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`photoId`);

--
-- Índices de tabela `profilePics`
--
ALTER TABLE `profilePics`
  ADD PRIMARY KEY (`profilePictureId`);

--
-- Índices de tabela `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`questionId`);

--
-- Índices de tabela `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`reportId`);

--
-- Índices de tabela `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`userId`,`questionId`);

--
-- Índices de tabela `styles`
--
ALTER TABLE `styles`
  ADD PRIMARY KEY (`styleId`);

--
-- Índices de tabela `userResponses`
--
ALTER TABLE `userResponses`
  ADD PRIMARY KEY (`responseId`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`), ADD UNIQUE KEY `facebookId` (`facebookId`), ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `usersBands`
--
ALTER TABLE `usersBands`
  ADD PRIMARY KEY (`bandId`,`userId`);

--
-- Índices de tabela `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`bandId`,`videoId`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `admins`
--
ALTER TABLE `admins`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de tabela `alternatives`
--
ALTER TABLE `alternatives`
  MODIFY `alternativeId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `audios`
--
ALTER TABLE `audios`
  MODIFY `audioId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `bands`
--
ALTER TABLE `bands`
  MODIFY `bandId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `bandTypes`
--
ALTER TABLE `bandTypes`
  MODIFY `typeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de tabela `events`
--
ALTER TABLE `events`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `likes`
--
ALTER TABLE `likes`
  MODIFY `likeId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `notices`
--
ALTER TABLE `notices`
  MODIFY `noticeId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `photos`
--
ALTER TABLE `photos`
  MODIFY `photoId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `profilePics`
--
ALTER TABLE `profilePics`
  MODIFY `profilePictureId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `questions`
--
ALTER TABLE `questions`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `reports`
--
ALTER TABLE `reports`
  MODIFY `reportId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `styles`
--
ALTER TABLE `styles`
  MODIFY `styleId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de tabela `userResponses`
--
ALTER TABLE `userResponses`
  MODIFY `responseId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

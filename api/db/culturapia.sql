-- phpMyAdmin SQL Dump
-- version 4.3.7
-- http://www.phpmyadmin.net
--
-- Host: mysql04-farm68.kinghost.net
-- Tempo de geração: 04/04/2017 às 22:28
-- Versão do servidor: 5.6.35-log
-- Versão do PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `culturapia`
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
  `isDeleted` int(11) NOT NULL,
  `bandId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `alternatives`
--

INSERT INTO `alternatives` (`alternativeId`, `questionId`, `description`, `isDeleted`, `bandId`) VALUES
(1, 1, 'alternativa', 0, 1),
(2, 1, 'alternativa 2', 1, 1),
(3, 1, 'alternativa 3', 0, 1),
(4, 3, 'sdkljfhdskjhf', 1, 3),
(5, 1, 'sdfdsdfsdf', 0, 1),
(6, 1, 'fdsfsdfsd', 0, 1),
(7, 3, 'sdfsdfsdfsdfsd', 0, 1),
(8, 4, 'dkytdkyd d dudud udku yfkuy dudugdugduy uf uhfjhf lu foud ljgdlud ullluydflufljhf luyf lufljluyfdluyd ljhfljgduo ydu duyfdlugdludouydlugdljdluy dluy dluydluy dluyduiydluydluyduy', 0, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `audios`
--

CREATE TABLE IF NOT EXISTS `audios` (
  `bandId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `audioId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `isReported` tinyint(1) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `audios`
--

INSERT INTO `audios` (`bandId`, `path`, `audioId`, `name`, `isDeleted`, `isReported`) VALUES
(1, 'audios/1_4985449_AC-DC - Hells Bells.mp3', 1, 'Hells Bells', 0, 0),
(2, 'audios/2_6207719_Ira-tarde_vazia.mp3', 2, '', 0, 0),
(4, 'audios/4_7424973_Oriente - O Vagabundo e a Dama (CLIPE OFICIAL).mp3', 3, '', 0, 0),
(4, 'audios/4_4519112_Ari - Chapado com você. ( Audio ).mp3', 4, 'ari :p', 0, 0),
(4, 'audios/4_0_Ari - Chapado com você. ( Audio ).mp3', 5, '', 1, 0),
(1, 'audios/1_4237302_AC-DC - You Shook Me All Night Long.mp3', 6, 'You Shook Me All Night Long', 0, 0),
(1, 'audios/1_5325249_AC-DC - Shoot To Thrill.mp3', 7, 'Shoot to Thrill', 0, 0),
(6, 'audios/6_3530752_Cat Stevens - Father and Son.mp3', 8, 'Cats Steves', 0, 0),
(8, 'audios/8_4179968_01 - Wasted Words.mp3', 9, 'Brothers Band', 0, 0),
(1, 'audios/1_5095593_- Todo dia', 10, 'Todo dia', 0, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `bandStyles`
--

CREATE TABLE IF NOT EXISTS `bandStyles` (
  `bandId` int(11) NOT NULL,
  `style` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `bandStyles`
--

INSERT INTO `bandStyles` (`bandId`, `style`) VALUES
(1, 'a'),
(8, 'rock roll');

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
  `isDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `bands`
--

INSERT INTO `bands` (`bandId`, `name`, `about`, `foundation`, `city`, `state`, `phone`, `email`, `isDeleted`) VALUES
(1, 'Minha Banda', 'Minha história', '2017-02-02 02:00:00', 93, 17, '65365436476', 'a@a.com', 0),
(2, 'rock', 'muito rock', '2017-02-04 02:00:00', 93, 17, '41996237911', 'fab@fab.com', 0),
(3, 'Felipe', 'jhklfjkdjfklçasjçakld', '2016-08-29 03:00:00', 93, 17, '96969696969', 'ca@ca.ig.com', 0),
(4, 'claudia', 'ooiiiiii lega', '2013-12-24 02:00:00', 93, 17, '11111111111', 'heheueuehuhe', 0),
(5, 'Metal', 'jdkfjkdjfçksjfçlskjdkljd', '2016-11-07 02:00:00', 11, 18, '99999999999', 'cabo@cabo.com', 0),
(6, 'tere', 'gsgafgdafgdfgdaf', '2016-11-08 02:00:00', 93, 17, '9999999999', 'fabcaron@hotmail.com', 0),
(7, 'outras flores', 'Fggghhgfdfggh', '2016-11-01 02:00:00', 93, 17, '9843438898', 'ef@ds.com', 0),
(8, 'Destroier', 'RSRSRSRRSRSRS', '1982-03-01 03:00:00', 8, 15, '99999999999', 'des@des.com', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text NOT NULL,
  `bandId` int(11) NOT NULL,
  `local` varchar(1024) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `events`
--

INSERT INTO `events` (`id`, `title`, `start`, `description`, `bandId`, `local`) VALUES
(1, 'festa rock', '2017-03-07 05:00:00', 'show', 3, 'paiol'),
(2, 'camilla', '2017-02-08 04:00:00', 'show', 4, 'caioba'),
(4, 'sdfsadfsa', '2017-02-06 20:00:00', 'sadfsdaf', 1, 'aaaaaaaaaaaaaaaaaaaaaa'),
(5, 'Show rock', '2017-03-22 08:00:00', 'fsdfhjsdkhfjksdlhjd', 6, 'Circulo Militar'),
(6, '', '2017-02-15 04:00:00', '', 1, '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `influences`
--

CREATE TABLE IF NOT EXISTS `influences` (
  `bandId` int(11) NOT NULL,
  `influence` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `influences`
--

INSERT INTO `influences` (`bandId`, `influence`) VALUES
(1, 'a'),
(8, 'rolling stones');

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
  `userId` bigint(20) NOT NULL,
  `likeDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `unliked` tinyint(1) NOT NULL,
  `bandId` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `neighborhood` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `likes`
--

INSERT INTO `likes` (`likeId`, `photoId`, `videoId`, `audioId`, `noticeId`, `userId`, `likeDate`, `unliked`, `bandId`, `city`, `state`, `neighborhood`) VALUES
(1, -1, 'RP0nJ8rUYWI', -1, -1, 1, '2017-02-04 02:50:42', 0, 1, '', '', ''),
(2, -1, 'RP0nJ8rUYWI', -1, -1, 2, '2017-02-04 11:28:21', 1, 1, '', '', ''),
(3, -1, 'Swch7jV4sIY', -1, -1, 3, '2017-02-04 13:41:07', 0, 3, '', '', ''),
(4, -1, 'SoUaoUZYxvc', -1, -1, 3, '2017-02-04 13:41:11', 0, 1, '', '', ''),
(5, -1, '-1', -1, -1, 5, '2017-02-05 23:55:57', 0, 2, '', '', ''),
(6, -1, 'Swch7jV4sIY', -1, -1, 5, '2017-02-05 23:55:45', 0, 3, '', '', ''),
(7, -1, 'SoUaoUZYxvc', -1, -1, 5, '2017-02-05 23:56:04', 0, 1, '', '', ''),
(8, -1, '-1', -1, -1, 6, '2017-02-06 00:26:48', 1, 4, '', '', ''),
(9, -1, '-1', -1, 38, 6, '2017-02-06 00:12:20', 0, 4, '', '', ''),
(10, -1, 'SoUaoUZYxvc', -1, -1, 1, '2017-02-06 20:19:12', 0, 1, 'Curitiba', 'PR', 'Pinheirinho'),
(11, -1, 'Swch7jV4sIY', -1, -1, 4, '2017-02-14 01:23:16', 0, 3, '', '', ''),
(12, -1, '-1', -1, -1, 4, '2017-02-28 20:06:55', 0, -1, '', '', ''),
(13, -1, 'hWoR4ReheXQ', -1, -1, 4, '2017-02-14 01:24:19', 0, 5, '', '', ''),
(14, -1, '-1', -1, 42, 4, '2017-02-11 23:53:07', 0, 6, '', '', ''),
(15, -1, 'SoUaoUZYxvc', -1, -1, 4, '2017-02-28 19:50:24', 0, 1, '', '', ''),
(16, -1, '-1', -1, 39, 4, '2017-02-13 00:44:05', 0, 1, '', '', ''),
(17, -1, 'RP0nJ8rUYWI', -1, -1, 4, '2017-02-28 19:50:16', 0, 1, '', '', ''),
(18, -1, '-1', -1, 44, 4, '2017-02-28 19:54:25', 0, 7, '', '', ''),
(19, -1, 'JTWI0TvnfQ8', -1, -1, 15, '2017-03-11 14:42:27', 0, 8, '', '', ''),
(20, -1, '-1', -1, -1, 15, '2017-03-11 14:42:29', 0, 8, '', '', ''),
(21, -1, '-1', -1, 45, 15, '2017-03-11 14:42:34', 0, 8, '', '', ''),
(22, -1, '-1', -1, -1, 1, '2017-04-04 00:13:29', 0, 1, 'Curitiba', 'PR', 'Pinheirinho');

-- --------------------------------------------------------

--
-- Estrutura para tabela `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `bandId` int(11) NOT NULL,
  `member` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `members`
--

INSERT INTO `members` (`bandId`, `member`) VALUES
(1, 'a'),
(8, '5');

-- --------------------------------------------------------

--
-- Estrutura para tabela `notices`
--

CREATE TABLE IF NOT EXISTS `notices` (
  `noticeId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `notice` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `isReported` tinyint(1) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `notices`
--

INSERT INTO `notices` (`noticeId`, `bandId`, `notice`, `date`, `isDeleted`, `isReported`) VALUES
(1, 1, 'halksdjfhasdkfljhdf', '2017-02-04 02:48:56', 1, 0),
(2, 4, 'oooi', '2017-02-05 23:59:35', 0, 0),
(3, 4, 'oooi', '2017-02-05 23:59:39', 0, 0),
(4, 4, 'oooi', '2017-02-05 23:59:40', 0, 0),
(5, 4, 'oooi', '2017-02-05 23:59:40', 0, 0),
(6, 4, 'oooi', '2017-02-05 23:59:40', 0, 0),
(7, 4, 'oooi', '2017-02-05 23:59:41', 0, 0),
(8, 4, 'oooi', '2017-02-05 23:59:41', 0, 0),
(9, 4, 'oooi', '2017-02-05 23:59:42', 0, 0),
(10, 4, 'oooi', '2017-02-05 23:59:42', 0, 0),
(11, 4, 'oooi', '2017-02-05 23:59:42', 0, 0),
(12, 4, 'oooi', '2017-02-05 23:59:42', 0, 0),
(13, 4, 'oooi', '2017-02-05 23:59:42', 0, 0),
(14, 4, 'oooi', '2017-02-05 23:59:43', 0, 0),
(15, 4, 'oooi', '2017-02-05 23:59:43', 0, 0),
(16, 4, 'oooi', '2017-02-05 23:59:43', 0, 0),
(17, 4, 'oooi', '2017-02-05 23:59:43', 0, 0),
(18, 4, 'oooi', '2017-02-05 23:59:44', 0, 0),
(19, 4, 'oooi', '2017-02-05 23:59:44', 0, 0),
(20, 4, 'oooi', '2017-02-05 23:59:44', 0, 0),
(21, 4, 'oooi', '2017-02-05 23:59:45', 0, 0),
(22, 4, 'oooi', '2017-02-05 23:59:46', 0, 0),
(23, 4, 'oooi', '2017-02-05 23:59:46', 0, 0),
(24, 4, 'oooi', '2017-02-05 23:59:46', 0, 0),
(25, 4, 'oooi', '2017-02-05 23:59:47', 0, 0),
(26, 4, 'oooi', '2017-02-05 23:59:47', 0, 0),
(27, 4, 'oooi', '2017-02-05 23:59:48', 0, 0),
(28, 4, 'oooi', '2017-02-05 23:59:49', 0, 0),
(29, 4, 'oooi', '2017-02-05 23:59:50', 0, 0),
(30, 4, 'oooi', '2017-02-05 23:59:50', 0, 0),
(31, 4, 'oooi', '2017-02-05 23:59:50', 0, 0),
(32, 4, 'oooi7yuhrhr', '2017-02-05 23:59:54', 0, 0),
(33, 4, 'oooi7yuhrhr', '2017-02-05 23:59:54', 0, 0),
(34, 4, 'oooi7yuhrhr', '2017-02-05 23:59:54', 0, 0),
(35, 4, 'oooi7yuhrhr', '2017-02-05 23:59:54', 0, 0),
(36, 4, 'oooi7yuhrhr', '2017-02-05 23:59:55', 0, 0),
(37, 4, 'lasanha', '2017-02-06 00:04:18', 0, 0),
(38, 4, 'pizza', '2017-02-06 00:04:28', 0, 0),
(39, 1, 'sdfgfshfsgfdg', '2017-02-06 20:01:47', 0, 0),
(40, 1, 'sdfgdsfgdsfgsd', '2017-02-06 20:01:51', 0, 1),
(41, 5, 'Hoje vai chover?', '2017-02-09 00:42:25', 0, 0),
(42, 6, 'oi tudo bem?', '2017-02-09 18:01:39', 0, 0),
(43, 6, 'ola tudo bem galera vai rolar um show', '2017-02-11 23:55:06', 0, 0),
(44, 7, 'Ffgbhfshvfhf', '2017-02-27 01:02:35', 0, 0),
(45, 8, 'Hj o dia foi só de ensaio .', '2017-03-11 02:29:11', 0, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `photoId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `isReported` tinyint(1) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `photos`
--

INSERT INTO `photos` (`photoId`, `bandId`, `path`, `isDeleted`, `description`, `isReported`) VALUES
(1, 1, 'images/1_acdc-capa-album-black-ice-2008.jpg_284642', 0, 'Capa', 0),
(2, 1, 'images/1_download (1).jpg_10142', 0, 'hgfhf', 0),
(3, 1, 'images/1_images.jpg_7334', 0, 'hgfdgfd', 0),
(4, 3, 'images/3_indo.jpg_34296', 0, 'briga', 0),
(5, 4, 'images/4_WIN_20151031_002431.JPG_108185', 0, 'oi', 0),
(6, 6, 'images/6_Koala.jpg_780831', 0, 'radical', 0),
(7, 1, 'images/1_1489452127872-1407935211.jpg_970591', 0, 'Suco', 0),
(8, 1, 'images/1_1489452345702-1397457483.jpg_1007352', 0, 'Oktober', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `profilePics`
--

CREATE TABLE IF NOT EXISTS `profilePics` (
  `profilePicId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `profilePics`
--

INSERT INTO `profilePics` (`profilePicId`, `bandId`, `path`) VALUES
(1, 1, 'images/profile-band-pic/1_acdc-capa-album-black-ice-2008.jpg'),
(2, 4, 'images/profile-band-pic/4_DSCF9153.JPG'),
(3, 5, 'images/profile-band-pic/5_2016-06-26 17.40.17.jpg'),
(4, 6, 'images/profile-band-pic/6_Thomas Edison.bmp'),
(5, 8, 'images/profile-band-pic/8_vmfoto05.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `questionId` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `bandId` int(11) NOT NULL,
  `isDeleted` int(11) NOT NULL,
  `isReported` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `questions`
--

INSERT INTO `questions` (`questionId`, `description`, `bandId`, `isDeleted`, `isReported`) VALUES
(1, 'pergunta', 1, 0, 0),
(2, 'ksajhdkasjhdkasjd', 1, 1, 0),
(3, 'fhgfghfghfghdgfhfdgh', 1, 0, 0),
(4, 'gggggggggggggggggggggg', 1, 0, 0),
(5, ',jhgdkugyd luihyf lhjf uljd uydljhfljydludljdluyd yd luyduy duydf lud uldliyduyd jhf liyfiyfihfluiyfiuyfdluyfljyf iyfiluyf  çilfliufgliuf iugilyf iyugfiuf iyf liuy fiu', 1, 1, 0);

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
  `userId` bigint(20) NOT NULL,
  `reportDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bandId` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `reports`
--

INSERT INTO `reports` (`reportId`, `photoId`, `videoId`, `questionId`, `noticeId`, `userId`, `reportDate`, `bandId`) VALUES
(1, -1, 'RP0nJ8rUYWI', -1, -1, 1, '2017-02-06 19:57:16', 1),
(2, -1, '-1', -1, 40, 4, '2017-02-08 21:01:46', 1),
(3, -1, '-1', -1, 40, 4, '2017-02-08 23:46:01', 1),
(4, -1, '-1', -1, 39, 4, '2017-02-08 23:46:52', 1),
(6, -1, 'SoUaoUZYxvc', -1, -1, 1, '2017-03-11 21:45:33', 1),
(7, -1, 'SoUaoUZYxvc', -1, -1, 1, '2017-03-11 21:48:04', 1),
(8, -1, 'SoUaoUZYxvc', -1, -1, 1, '2017-03-11 21:51:00', 1),
(9, -1, 'SoUaoUZYxvc', -1, -1, 1, '2017-03-11 21:51:55', 1),
(10, -1, 'SoUaoUZYxvc', -1, -1, 1, '2017-03-11 21:53:48', 1),
(11, -1, 'SoUaoUZYxvc', -1, -1, 1, '2017-03-11 21:56:03', 1),
(12, -1, '-1', -1, 39, 1, '2017-03-11 22:10:06', 1),
(13, -1, '-1', 1, -1, 1, '2017-04-05 00:34:48', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `response`
--

CREATE TABLE IF NOT EXISTS `response` (
  `userId` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `alternativeId` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `styles`
--

CREATE TABLE IF NOT EXISTS `styles` (
  `styleId` int(11) NOT NULL,
  `style` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `styles`
--

INSERT INTO `styles` (`styleId`, `style`) VALUES
(1, 'samba'),
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `userResponses`
--

INSERT INTO `userResponses` (`responseId`, `userId`, `questionId`, `alternativeId`, `date`) VALUES
(1, 1, 1, 1, '2017-04-03 22:31:25'),
(2, 1, 3, 7, '2017-04-03 23:37:37'),
(3, 1, 4, 8, '2017-04-03 23:37:45');

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
  `profilePicture` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `users`
--

INSERT INTO `users` (`userId`, `facebookId`, `facebookToken`, `name`, `phone`, `email`, `birthday`, `cep`, `address`, `number`, `complement`, `neighborhood`, `city`, `state`, `password`, `profilePicture`) VALUES
(1, '10209681138732632', 'EAADJZAKpUttgBAEt5X2QLrWnpburkZCbFh2ZAUxh4F34BbTrjZBHTwuYmBCZBNgnB3QVk4dCRESKxKuQ5tTGZAZCefc6KJOFKgHiCkFZBS3O6ZAr6bFX5PuZBTOhsNS7e57tWhdSf0tJZC9ZCisKnFZB9ZCdOl30ZCXQuWGykfQ3GpWLs9ihair4qzEA6go', 'Carlos Augusto Grispan', '99999999999', 'cagrispan@gmail.com', '1987-10-10 06:00:00', 81870000, 'Rua Izaac Ferreira da Cruz', 332, 'ap 401', 'Pinheirinho', 'Curitiba', 'PR', '81dc9bdb52d04dc20036dbd8313ed055', 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10685428_10205316305014517_2674489246398064474_n.jpg?oh=61329fc1eb87c8a7b23796a6314a5124&oe=5943CC08'),
(2, NULL, NULL, 'fabiano', NULL, 'fabcaron@ig.com.br', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50dac7d217e184ff5791a175ba51f9f8', ''),
(3, NULL, NULL, 'Camilla', NULL, 'ca@ca.ig.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '7e04da88cbb8cc933c7b89fbfe121cca', ''),
(4, '1366796443387551', 'EAADJZAKpUttgBAGZBtCnowrg1RsqcUqWs2moAuQledj0oVZAS0LstydnRfK2WxZA9k7wu6jz4q6eGXCnEII2Qa84Ng8zABnAOfnpaZA1MpcAx4TiqSan4bODYrpZAcBV4ZCkJZAebspRocdlhag5tQpZAYis6FuyCU3ThqP4aeTb4onvAOUrqSM2xlYBm8uqRXTMZD', 'Fabiano Caron', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ''),
(5, '1213642602084442', 'EAADJZAKpUttgBABusOrYXek5ZCjIf72FZAcgQSO3VNAcr1ZBajovrOGnUZCNbICFSaB9Ps1ONVTv8jHZAzks6zc7GnSq34iVBlaZBO6mryLRWFj0R4CEuv7WctKiMTwLNx0NFKwR2KZBQZCnyvapSlfmYupKaI0F1UhOtUhJ449vjo6I3ZBdL7bzu9muE9XXZAZC590ZD', 'Camilla Luizaga Caron', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ''),
(6, NULL, NULL, 'fabiana', NULL, 'fabiana@hotmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '7e04da88cbb8cc933c7b89fbfe121cca', ''),
(7, NULL, NULL, 'a', NULL, 'a@a.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0cc175b9c0f1b6a831c399e269772661', ''),
(8, '', '', 'Fabiano', '', 'fabcaron@hotmail.com', '0000-00-00 00:00:00', 0, '', 0, '', '', '', '', '5fbab4399b77a794b90906ecc483010d', ''),
(10, NULL, NULL, 'Camilla', NULL, 'camicaron@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50dac7d217e184ff5791a175ba51f9f8', ''),
(11, NULL, NULL, 'capa', NULL, 'leonardocaron42@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '56daf002d328229cf4ef837e0b0ecbde', ''),
(14, NULL, NULL, 'felipon', '88888888888', 'fabian@fabian.com', '1973-07-13 06:00:00', 80010150, 'Rua Monsenhor Celso', 231, 'ap', 'Centro', 'Curitiba', 'PR', 'e10adc3949ba59abbe56e057f20f883e', ''),
(15, NULL, NULL, 'julio', NULL, 'ju@ju.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0348dcd774a2892097b9d5c84ce882d3', ''),
(16, NULL, NULL, 'aaaaaa', NULL, 'c@c.com', NULL, 81870000, 'Rua Izaac Ferreira da Cruz', 332, 'ap 41', 'Pinheirinho', 'Curitiba', 'PR', '81dc9bdb52d04dc20036dbd8313ed055', ''),
(17, NULL, NULL, 'bbbbbb', NULL, 'b@b.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '81dc9bdb52d04dc20036dbd8313ed055', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usersBands`
--

CREATE TABLE IF NOT EXISTS `usersBands` (
  `bandId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `usersBands`
--

INSERT INTO `usersBands` (`bandId`, `userId`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '5'),
(5, '8'),
(6, '4'),
(7, '11'),
(8, '15');

-- --------------------------------------------------------

--
-- Estrutura para tabela `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
  `bandId` int(11) NOT NULL,
  `videoId` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `title` varchar(255) NOT NULL,
  `style` varchar(255) NOT NULL,
  `band` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `isReported` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `videos`
--

INSERT INTO `videos` (`bandId`, `videoId`, `isDeleted`, `title`, `style`, `band`, `city`, `state`, `description`, `isReported`) VALUES
(1, 'RP0nJ8rUYWI', 0, 'musica', '', 'Minha Banda', '93', '17', 'aaaaaaaaaaa', 0),
(1, 'SoUaoUZYxvc', 0, 'qqqqqqqqqqq', '', 'Minha Banda', '93', '17', 'qqqqqqqqq', 0),
(3, 'Swch7jV4sIY', 0, 'rock', 'rock', 'Felipe', '93', '17', 'muito boa', 0),
(5, 'hWoR4ReheXQ', 0, 'Casa', 'rock', 'Metal', '11', '18', 'bom', 0),
(1, 'SlDVDunLMXQ', 1, 'Qualquer', 'jazz', 'Minha Banda', '93', '17', 'Qualquer', 0),
(8, 'JTWI0TvnfQ8', 0, 'jkljlkjkjlkjlk', 'rock', 'Destroier', '8', '15', 'jkjlkjlkjlkjlkjlkj', 0);

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
-- Índices de tabela `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`profilePicId`);

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
  MODIFY `alternativeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de tabela `audios`
--
ALTER TABLE `audios`
  MODIFY `audioId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de tabela `bands`
--
ALTER TABLE `bands`
  MODIFY `bandId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de tabela `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de tabela `likes`
--
ALTER TABLE `likes`
  MODIFY `likeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de tabela `notices`
--
ALTER TABLE `notices`
  MODIFY `noticeId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT de tabela `photos`
--
ALTER TABLE `photos`
  MODIFY `photoId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de tabela `profilePics`
--
ALTER TABLE `profilePics`
  MODIFY `profilePicId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de tabela `questions`
--
ALTER TABLE `questions`
  MODIFY `questionId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de tabela `reports`
--
ALTER TABLE `reports`
  MODIFY `reportId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de tabela `styles`
--
ALTER TABLE `styles`
  MODIFY `styleId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de tabela `userResponses`
--
ALTER TABLE `userResponses`
  MODIFY `responseId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

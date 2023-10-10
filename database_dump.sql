-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: freeboards
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `writer` varchar(255) NOT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `hit` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'zz','zzz','zzzzz11','2023-10-01 02:20:47',5),(5,'55','555','555','2023-10-05 16:08:45',3),(6,'22','222','12222222','2023-10-05 16:08:54',1),(7,'ㅋㅋㅋ','ㅋㅋㅋ','ㅋㅋㅋㅋ','2023-10-06 14:48:15',1);
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freeboards`
--

DROP TABLE IF EXISTS `freeboards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freeboards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `writer` varchar(255) NOT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `hit` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freeboards`
--

LOCK TABLES `freeboards` WRITE;
/*!40000 ALTER TABLE `freeboards` DISABLE KEYS */;
INSERT INTO `freeboards` VALUES (1,'제목1','작가1','내용1','2023-09-27 16:11:38',2),(2,'1','2','3','2023-09-28 15:49:53',1),(3,'3','4','5','2023-09-28 15:52:44',1),(4,'5','7','7','2023-09-28 15:55:14',2),(6,'마지막글','마지막글','마지막글','2023-09-29 14:33:14',3),(7,'ㅋㅋㅋ','ㅋㅋㅋ','ㅋㅋㅋㅋ','2023-09-29 14:35:14',0),(8,'ㅋㅇㅁㅁㅇ','ㅁㅇㅇㅁㄴㅁㄴㅇ','ㅁㄹㄴㄻㄴㄻㄴ','2023-09-29 14:38:19',0),(9,'이젠 되겠지?','이젠 되겠지?','이젠 되겠지?','2023-09-29 14:45:20',0),(10,'진짜 되겠지','진짜 되겠지','진짜 되겠지','2023-09-29 14:46:07',0),(11,'진짜 되겠지','진짜 되겠지','진짜 되겠지','2023-09-29 14:47:33',1),(13,'aa','aaa','aaa','2023-09-29 14:53:48',0),(14,'aa','aaa','aaa','2023-09-29 14:55:01',0),(15,'aa','aaa','aaa','2023-09-29 14:55:42',0),(16,'aa','aaa','aaa','2023-09-29 14:57:10',0),(17,'aa','aaa','aaa','2023-09-29 14:58:52',0),(18,'ㅠㅠ','ㅠㅠ','ㅠㅠㅠ','2023-09-29 15:27:36',0),(19,'ㅍㅍ','ㅍㅍ','ㅍㅍ','2023-09-29 15:30:02',2),(23,'김호현 ㅗㅗ','ㅗㅗ','ㅗㅗ','2023-10-04 15:11:31',3),(24,'zz','zz','zzzz','2023-10-05 16:05:03',1),(25,'김호현 바보','바보','바보 ㅗㅗ','2023-10-05 16:06:45',1),(26,'ㅂㅂㅂㅂ','ㅂㅂㅂ','ㅂㅂㅂㅂㅂ','2023-10-05 16:07:25',1),(27,'ㅋㅋㅋ','ㅋㅋㅋ','ㅋㅋㅋㅋ','2023-10-05 16:12:08',1);
/*!40000 ALTER TABLE `freeboards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `level` int DEFAULT '1',
  `registered_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 15:08:14

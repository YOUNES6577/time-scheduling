-- MariaDB dump 10.19  Distrib 10.5.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tsh
-- ------------------------------------------------------
-- Server version	10.5.12-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tsh`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tsh` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `tsh`;

--
-- Table structure for table `AppLogin`
--

DROP TABLE IF EXISTS `AppLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AppLogin` (
  `ID_User` int(11) NOT NULL AUTO_INCREMENT,
  `User` varchar(20) NOT NULL,
  `Pass` varchar(64) NOT NULL,
  PRIMARY KEY (`ID_User`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AppLogin`
--

LOCK TABLES `AppLogin` WRITE;
/*!40000 ALTER TABLE `AppLogin` DISABLE KEYS */;
INSERT INTO `AppLogin` VALUES (1,'Anes','tshPass');
/*!40000 ALTER TABLE `AppLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `psgendb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `psgendb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `psgendb`;

--
-- Table structure for table `password`
--

DROP TABLE IF EXISTS `password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `User` varchar(50) NOT NULL,
  `Pass` varchar(255) NOT NULL,
  `Comment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password`
--

LOCK TABLES `password` WRITE;
/*!40000 ALTER TABLE `password` DISABLE KEYS */;
INSERT INTO `password` VALUES (8,'0797939790','Q\\]%~)bVp3!B+\\F','Djezzy Account'),(9,'amriyounes72','5fVNQRHbJC','master_medea'),(10,'0783014312','PQ0YM6XU7V','fbAccount'),(11,'y0un35@ya.ru','ilC5JRvINrj9XWB','angel.co/join'),(13,'y0un35','codeacademy19','Code Academy Account'),(14,'y0un35','Ciscoanes21','Cisco(Netacad)'),(15,'y0un35','mDk5wYLPXLVw2XtA','Email'),(16,'DataCamp','_nL/R\\wA[IQ=',''),(17,'y0un35','G2fSM_)RD[oK','Cisco_Netcad'),(18,'y0un35','R}HY&CQ<c~7D','inscription_master_bejaia'),(19,'y0un35','redhatpass21','redhat'),(20,'171732043788','N31ajSDYRN','Uscol_univ_Medea'),(21,'y0un35','todoist2022','todoist.com'),(22,'y0un35','2SbmXmSfGLaKin3','coursera.org'),(23,'y0un35','QiwRApaYxW','Xmind.Web'),(24,'label','`R@,oT\'wz:;]rAX','//'),(25,'','9aHRxJAsDj','Wifipassword'),(26,'192.168.100.1','FLDc3XuPkS','Routerpassword'),(27,'/','aneswin','win10_vm'),(29,'y0un35','githubpass19','github'),(30,'younes_prv','t4jT9TbVyYbKim5','insta'),(31,'y0un35','imkqnxez','researchgate'),(32,'amriyounes72','kmqT4iNa','mathworks'),(33,'y0un35','cLiX8u9z7*m=GtY','oracle_Account'),(34,'','cLiX8u9z7*m=GtY',''),(35,'*','stkbgmxu#1','heroku'),(36,'studypool','studyPool22','amriyounes72'),(37,'amriyounes72','britishcouncil22pass','British Councile account');
/*!40000 ALTER TABLE `password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`Id_user`),
  UNIQUE KEY `usrname` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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

-- Dump completed on 2022-06-22 17:44:03

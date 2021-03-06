CREATE TABLE `Token_Data_US` (
  `ID` int(11) NOT NULL,
  `PRICE` int(11) NOT NULL,
  `EPOCH` bigint(13) NOT NULL,
  `LAST_UPDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TIME_ENTERED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`),
 UNIQUE KEY `EPOCH` (`EPOCH`)
) ENGINE=InnoDB AUTO_INCREMENT=1034 DEFAULT CHARSET=utf8 COLLATE=utf8_bin

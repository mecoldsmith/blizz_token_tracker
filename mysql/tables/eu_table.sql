CREATE TABLE `Token_Data_EU` (
 `ID` int(11) NOT NULL AUTO_INCREMENT,
 `PRICE` int(11) NOT NULL,
 `EPOCH` int(11) NOT NULL,
 `LAST_UPDATE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `TIME_ENTERED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 PRIMARY KEY (`ID`),
 UNIQUE KEY `EPOCH` (`EPOCH`)
) ENGINE=InnoDB AUTO_INCREMENT=1035 DEFAULT CHARSET=utf8 COLLATE=utf8_bin
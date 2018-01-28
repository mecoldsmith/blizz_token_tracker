CREATE DEFINER=`mecoldsmith`@`localhost` PROCEDURE `retrieveTest`()
   NO SQL
BEGIN

SELECT LAST_UPDATE AS LAST_UPDATE_US, PRICE AS PRICE_US
FROM Token_Data_US 
WHERE LAST_UPDATE >= DATE(NOW()) + INTERVAL -6 DAY 
AND LAST_UPDATE < NOW() + INTERVAL 0 DAY;

SELECT LAST_UPDATE AS LAST_UPDATE_EU, PRICE AS PRICE_EU
FROM Token_Data_EU 
WHERE LAST_UPDATE >= DATE(NOW()) + INTERVAL -6 DAY 
AND LAST_UPDATE < NOW() + INTERVAL 0 DAY;

SELECT LAST_UPDATE AS LAST_UPDATE_KR, PRICE AS PRICE_KR
FROM Token_Data_KR 
WHERE LAST_UPDATE >= DATE(NOW()) + INTERVAL -6 DAY 
AND LAST_UPDATE < NOW() + INTERVAL 0 DAY;

SELECT LAST_UPDATE AS LAST_UPDATE_TW, PRICE AS PRICE_TW
FROM Token_Data_TW 
WHERE LAST_UPDATE >= DATE(NOW()) + INTERVAL -6 DAY 
AND LAST_UPDATE < NOW() + INTERVAL 0 DAY;

END
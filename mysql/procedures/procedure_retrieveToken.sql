CREATE DEFINER=`you`@`localhost` PROCEDURE `retrieveToken`(IN `table_used` VARCHAR(25))
BEGIN

SET @retrieve_table = CONCAT('SELECT', DATE_FORMAT('LAST_UPDATE', '%Y-%m-%d %k:%i:%s'),'AS NEW_DATE, PRICE FROM ',table_used,'WHERE LAST_UPDATE >= DATE(NOW()) + INTERVAL -6 DAY, AND LAST_UPDATE < NOW() + INTERVAL 0 DAY');
PREPARE stmnt FROM @retrieve_table;
EXECUTE stmnt;
DEALLOCATE PREPARE stmnt;

END
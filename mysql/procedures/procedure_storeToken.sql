CREATE DEFINER=`user`@`localhost` PROCEDURE `storeToken`(IN `price` INT, IN `epoch` BIGINT, IN `table_used` VARCHAR(25))
BEGIN

SET @using_table = CONCAT('INSERT IGNORE into ',table_used,'(PRICE, LAST_UPDATE,TIME_ENTERED, EPOCH) 
VALUES(',price,', from_unixtime(',epoch,'), CURRENT_TIMESTAMP,', epoch,')');

PREPARE stmnt FROM @using_table;
EXECUTE stmnt;
DEALLOCATE PREPARE stmnt;
END

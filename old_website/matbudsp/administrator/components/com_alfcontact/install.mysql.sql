CREATE TABLE IF NOT EXISTS `#__alfcontact` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`name` varchar(255) NOT NULL,
		`email` varchar(255) NOT NULL,
		`prefix` varchar(255) NOT NULL,
		`extra` varchar(255) NOT NULL,
		`defsubject` varchar(255) NOT NULL,
		`standard` TINYINT(1) NOT NULL,
		`access` TINYINT(3) UNSIGNED NOT NULL, 
		`published` TINYINT(1) NOT NULL default '1',
		PRIMARY KEY (`id`)
		)TYPE=MyISAM CHARACTER SET `utf8`;

INSERT INTO `#__alfcontact` VALUES (1, 'Webmaster', 'webmaster@yoursite.com', '', '', '',  1, 0, 1);
INSERT INTO `#__alfcontact` VALUES (2, 'Sales', 'info@yoursite.com', '[Sales]', 'Order number', 'Sales inquiry', 0, 0, 0);
INSERT INTO `#__alfcontact` VALUES (3, 'Billing', 'info@yoursite.com','[Billing]','Invoice number', 'About my invoice', 0, 1, 1);
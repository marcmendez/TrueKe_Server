SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `restful_api` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE `restful_api`;

-- -----------------------------------------------------
-- Table `restful_api_demo`.`user_login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restful_api`.`user_login`;

CREATE TABLE IF NOT EXISTS `restful_api`.`user` (
  `id` INT(70) AUTO_INCREMENT,
  `phone` VARCHAR(20) NOT NULL,
  `user` VARCHAR(20) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50),
  `birthDate` DATE NOT NULL,
  `products` INT(10) DEFAULT 0,
  `truekes` INT(10) DEFAULT 0,
  `rating` FLOAT(3, 2) DEFAULT 0.0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `phone_email_UNIQUE` (`phone` ASC))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;






-- Example of insert
-- INSERT INTO `user`(`phone`, `user`, `password`, `birthDate`) VALUES ('654654654', 'Homer', 'passapalabra', '1996-04-02')

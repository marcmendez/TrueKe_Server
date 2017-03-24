SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `restful_api` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE `restful_api`;
-- -----------------------------------------------------
-- Table `restful_api`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restful_api`.`user`;

CREATE TABLE IF NOT EXISTS `restful_api`.`user` (

  `id` INT(70) AUTO_INCREMENT,
  `phone` VARCHAR(20) NOT NULL,
  `user` VARCHAR(20) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `birthDate` DATE NOT NULL,
  `products` INT(10) DEFAULT 0,
  `truekes` INT(10) DEFAULT 0,
  `rating` FLOAT(3, 2) DEFAULT 0.0,

  PRIMARY KEY (`id`),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE = InnoDB;

-- Example of insert (user)
-- INSERT INTO `user`(`phone`, `user`, `password`, `email`, `birthDate`) VALUES ('654654654', 'Homer', 'passapalabra', 'homer@badulaque.com', '1996-04-02');

-- -----------------------------------------------------
-- Table `restful_api`.`user_payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restful_api`.`payment_method`;

CREATE TABLE IF NOT EXISTS `restful_api`.`payment_method` (
  `id` INT(70) AUTO_INCREMENT,
  `user_id` INT(70) NOT NULL,
  `type` ENUM('Visa/4B/Euro6000', 'MasterCard/4B/Euro6000', 'American Express', 'Maestro'),
  `number` VARCHAR(20) NOT NULL,
  `expireDate` DATE NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `province` VARCHAR(50) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `postalCode` INT(10) NOT NULL,
  `adress` VARCHAR(70) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,

  CONSTRAINT Pk_payment_method PRIMARY KEY (`id`),
  CONSTRAINT Uniques_payment_method UNIQUE KEY (`user_id`, `number`),
  CONSTRAINT Fk_user_id FOREIGN KEY (`user_id`) REFERENCES user(`id`)
  ON DELETE CASCADE
) ENGINE = InnoDB;

-- Example of insert (payment_method)

-- INSERT INTO `user`(`phone`, `user`, `password`, `email`, `birthDate`) VALUES ('654654654', 'Homer', 'passapalabra', 'homer@badulaque.com', '1996-04-02');
-- INSERT INTO `payment_method`(`user_id`, `type`, `number`, `expireDate`, `name`, `country`, `province`, `city`, `postalCode`, `adress`, `phone`) VALUES ('1', 'MasterCard/4B/Euro6000','1234123412341234', '2020-02-01', 'Homer', 'America', 'Barcelona', 'Springfield', '11101', 'Calle del general Comilla', '619703921');

-- -----------------------------------------------------
-- Table `restful_api`.`shipment_method`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `restful_api`.`shipment_method`;

CREATE TABLE IF NOT EXISTS `restful_api`.`shipment_method` (

  `id` INT(70) AUTO_INCREMENT,
  `user_id` INT(70) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `province` VARCHAR(50) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `postalCode` INT(10) NOT NULL,
  `adress` VARCHAR(70) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `idCard` VARCHAR(20) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,

  CONSTRAINT Pk_shipment_method PRIMARY KEY (`id`),
  CONSTRAINT Uniques_shipment_method UNIQUE KEY (`user_id`, `postalCode`, `adress`),
  CONSTRAINT Fk_user_id_shipment_method FOREIGN KEY (`user_id`) REFERENCES user(`id`)
  ON DELETE CASCADE
) ENGINE = InnoDB;

-- Example of insert (payment_method)

-- INSERT INTO `user`(`phone`, `user`, `password`, `email`, `birthDate`) VALUES ('654654654', 'Homer', 'passapalabra', 'homer@badulaque.com', '1996-04-02');
-- INSERT INTO `shipment_method`(`user_id`, `country`, `province`, `city`, `postalCode`, `adress`, `name`, `idCard`, `phone`) VALUES ('1', 'America', 'Barcelona', 'Springfield', '11101', 'Calle del general Comilla', 'Homer', '12931230', '619703921');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

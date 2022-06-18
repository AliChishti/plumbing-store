CREATE TABLE store.`user` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`username` VARCHAR(255) NOT NULL UNIQUE,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL
);

CREATE TABLE store.`category` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE store.`product` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL UNIQUE,
	`description` VARCHAR(255),
	`image` VARCHAR(255),
	`price` INT NOT NULL,
	`category` INT NOT NULL,
	FOREIGN KEY (`category`) REFERENCES store.`category`(`id`)
);

CREATE TABLE store.`feedback` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`product` INT NOT NULL,
	`user` INT NOT NULL,
	`rating` INT NOT NULL,
	`comment` VARCHAR(255),
	FOREIGN KEY (`user`) REFERENCES store.`user`(`id`),
	FOREIGN KEY (`product`) REFERENCES store.`product`(`id`)
);

CREATE TABLE store.`card` (
	`number` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`ccv` INT NOT NULL,
	`user` INT NOT NULL,
	`validity` DATE NOT NULL,
	`type` VARCHAR(255) NOT NULL,
	FOREIGN KEY (`user`) REFERENCES store.`user`(`id`)
);

CREATE TABLE store.`order` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user` INT NOT NULL,
	`detail` VARCHAR(16000) NOT NULL,
	`status` VARCHAR(255) NOT NULL,
	`price` INT NOT NULL,
	FOREIGN KEY (`user`) REFERENCES store.`user`(`id`)
);

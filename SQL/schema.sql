DROP DATABASE `chat`;

CREATE DATABASE `chat`;

USE `chat`;

CREATE TABLE `chats` (
  `id` INT(5) NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `chat_text` TEXT(200),
  `username` VARCHAR(15),
  `roomname` VARCHAR(15),
  PRIMARY KEY  (`id`)
);

CREATE TABLE `users` (
  `id` INT(5) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(15),
  `user_id` INT(5),
  PRIMARY KEY  (`id`)
);

CREATE TABLE `rooms` (
  `id` INT(5) NOT NULL AUTO_INCREMENT,
  `roomname` VARCHAR(15),
  `room_id` INT(5),
  PRIMARY KEY  (`id`)
);

CREATE TABLE `participants` (
  `id` INT(5) NOT NULL AUTO_INCREMENT,
  `user_id` INT(5),
  `room_id` INT(5),
  PRIMARY KEY  (`id`)
);

CREATE TABLE `friendships` (
  `id` INT(5) NOT NULL AUTO_INCREMENT,
  `user_id` INT(5),
  `friend_id` INT(5),
  PRIMARY KEY  (`id`)
);


ALTER TABLE `users` ADD CONSTRAINT `users_fk1` FOREIGN KEY (`user_id`) REFERENCES users(`id`);
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_fk1` FOREIGN KEY (`room_id`) REFERENCES rooms(`id`);
ALTER TABLE `participants` ADD CONSTRAINT `participants_fk1` FOREIGN KEY (`user_id`) REFERENCES users(`id`);
ALTER TABLE `participants` ADD CONSTRAINT `participants_fk2` FOREIGN KEY (`room_id`) REFERENCES rooms(`id`);
ALTER TABLE `friendships` ADD CONSTRAINT `friendships_fk1` FOREIGN KEY (`user_id`) REFERENCES users(`id`);
ALTER TABLE `friendships` ADD CONSTRAINT `friendships_fk2` FOREIGN KEY (`friend_id`) REFERENCES users(`id`);

-- CREATE DATABASE chat;

-- USE chat;

-- CREATE TABLE chats (
--   id INT NOT NULL AUTO_INCREMENT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   text TEXT,
--   username INT,
--   roomname VARCHAR,
--   PRIMARY KEY  (id)
-- );

-- CREATE TABLE users (
--   id INT NOT NULL AUTO_INCREMENT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   username VARCHAR,
--   user_id INT,
--   PRIMARY KEY  (id)
-- );

-- CREATE TABLE rooms (
--   id INT NOT NULL AUTO_INCREMENT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   roomname VARCHAR,
--   room_id INT,
--   PRIMARY KEY  (id)
-- );

-- CREATE TABLE participants (
--   id INT NOT NULL AUTO_INCREMENT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   user_id INT,
--   room_id INT
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE friendships (
--   id INT NOT NULL AUTO_INCREMENT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   user_id INT,
--   friend_id INT
--   PRIMARY KEY (id)
-- );


-- ALTER TABLE users ADD CONSTRAINT users_fk1 FOREIGN KEY (user_id) REFERENCES users(id);
-- ALTER TABLE rooms ADD CONSTRAINT rooms_fk1 FOREIGN KEY (room_id) REFERENCES rooms(id);
-- ALTER TABLE participants ADD CONSTRAINT participants_fk1 FOREIGN KEY (user_id) REFERENCES users(id);
-- ALTER TABLE participants ADD CONSTRAINT participants_fk2 FOREIGN KEY (room_id) REFERENCES rooms(id);
-- ALTER TABLE friendships ADD CONSTRAINT friendships_fk1 FOREIGN KEY (user_id) REFERENCES users(id);
-- ALTER TABLE friendships ADD CONSTRAINT friendships_fk2 FOREIGN KEY (friend_id) REFERENCES users(id);

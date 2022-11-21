CREATE TABLE active_roles(updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, user_id int UNSIGNED NOT NULL, role_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE roles(name varchar(255)  NOT NULL, enable TINYINT  DEFAULT 1 NOT NULL , id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE users(name varchar(255)  NOT NULL, email varchar(255) UNIQUE  NOT NULL, phone varchar(14) UNIQUE NULL, google_id varchar(255) NULL, facebook_id varchar(255) NULL, password varchar(255) NULL, enable TINYINT  DEFAULT 1 NOT NULL , id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;INSERT INTO roles (name) VALUES ("admin"); ALTER TABLE active_roles ADD KEY active_role_user_id_foreign (`user_id`), ADD KEY active_role_role_id_foreign (`role_id`);ALTER TABLE active_roles ADD CONSTRAINT active_role_user_id_foreign  FOREIGN KEY  (`user_id`) REFERENCES users (`id`), ADD CONSTRAINT active_role_role_id_foreign  FOREIGN KEY  (`role_id`) REFERENCES roles (`id`);
CREATE TABLE users(
 name varchar(255) NOT NULL,
 email varchar(255) UNIQUE NOT NULL,
 phone varchar(14) UNIQUE NULL,
 google_id varchar(255) NULL,
 facebook_id varchar(255) NULL,
 password varchar(255) NULL,
 enable TINYINT DEFAULT 1 NOT NULL,
 id int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
 updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
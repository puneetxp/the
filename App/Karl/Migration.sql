CREATE TABLE active_roles(updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, user_id int UNSIGNED NOT NULL, role_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE bills(amount int  NOT NULL, gst_rate int  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, user_id int UNSIGNED NOT NULL, subscription_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE clients(id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, gstn_id int UNSIGNED NULL , user_id int UNSIGNED NOT NULL, executive_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE executives(name varchar(255)  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, user_id int UNSIGNED NOT NULL, service_id int UNSIGNED NULL )ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE gstns(gst_number varchar(255)  NOT NULL, address longtext  NULL , tradename varchar(255)  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE payments(id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, bill_id int UNSIGNED NOT NULL, payment_method_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE payment_methods(name varchar(255)  NOT NULL, api_token varchar(255)  NOT NULL, api_user varchar(255)  NOT NULL, api_password varchar(255)  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE photos(name varchar(255)  NOT NULL, dir varchar(255) DEFAULT '/storage/photos/' NOT NULL, alt varchar(255) NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE roles(name varchar(255)  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE services(name varchar(255)  NOT NULL, short_description longtext  NOT NULL, slug varchar(255)  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, photo_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE service_attributes(name varchar(255)  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, service_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE service_attribute_values(name varchar(255)  NOT NULL, value int  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, service_attribute_id int UNSIGNED NOT NULL, service_plan_duration_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE service_plans(name varchar(255)  NOT NULL, slug varchar(255) NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, service_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE service_plan_durations(name varchar(255)  NOT NULL, duration_day int  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, service_plan_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE service_plan_prices(name varchar(255)  NOT NULL, value int  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, service_plan_duration_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE sessions(token_id varchar(255)  NULL, login_ip varchar(255)  NULL, user_agent longtext  NOT NULL, PHPSESSID varchar(255)  NULL, remember tinyint  NOT NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, user_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE subscriptions(id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL, client_id int UNSIGNED NOT NULL, executive_id int UNSIGNED NOT NULL, service_plan_duration_id int UNSIGNED NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;CREATE TABLE users(name varchar(255)  NOT NULL, email varchar(255) UNIQUE  NOT NULL, google_id varchar(255) NULL, facebook_id varchar(255) NULL, password varchar(255) NULL, id int UNSIGNED PRIMARY KEY AUTO_INCREMENT, created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;INSERT INTO roles (name) VALUES ("admin"),("executive"); ALTER TABLE active_roles ADD KEY active_role_user_id_foreign (`user_id`), ADD KEY active_role_role_id_foreign (`role_id`);ALTER TABLE active_roles ADD CONSTRAINT active_role_user_id_foreign  FOREIGN KEY  (`user_id`) REFERENCES users (`id`), ADD CONSTRAINT active_role_role_id_foreign  FOREIGN KEY  (`role_id`) REFERENCES roles (`id`);ALTER TABLE bills ADD KEY bill_user_id_foreign (`user_id`), ADD KEY bill_subscription_id_foreign (`subscription_id`);ALTER TABLE bills ADD CONSTRAINT bill_user_id_foreign  FOREIGN KEY  (`user_id`) REFERENCES users (`id`), ADD CONSTRAINT bill_subscription_id_foreign  FOREIGN KEY  (`subscription_id`) REFERENCES subscriptions (`id`);ALTER TABLE clients ADD KEY client_gstn_id_foreign (`gstn_id`), ADD KEY client_user_id_foreign (`user_id`), ADD KEY client_executive_id_foreign (`executive_id`);ALTER TABLE clients ADD CONSTRAINT client_gstn_id_foreign  FOREIGN KEY  (`gstn_id`) REFERENCES gstns (`id`), ADD CONSTRAINT client_user_id_foreign  FOREIGN KEY  (`user_id`) REFERENCES users (`id`), ADD CONSTRAINT client_executive_id_foreign  FOREIGN KEY  (`executive_id`) REFERENCES executives (`id`);ALTER TABLE executives ADD KEY executive_user_id_foreign (`user_id`), ADD KEY executive_service_id_foreign (`service_id`);ALTER TABLE executives ADD CONSTRAINT executive_user_id_foreign  FOREIGN KEY  (`user_id`) REFERENCES users (`id`), ADD CONSTRAINT executive_service_id_foreign  FOREIGN KEY  (`service_id`) REFERENCES services (`id`);ALTER TABLE payments ADD KEY payment_bill_id_foreign (`bill_id`), ADD KEY payment_payment_method_id_foreign (`payment_method_id`);ALTER TABLE payments ADD CONSTRAINT payment_bill_id_foreign  FOREIGN KEY  (`bill_id`) REFERENCES bills (`id`), ADD CONSTRAINT payment_payment_method_id_foreign  FOREIGN KEY  (`payment_method_id`) REFERENCES payment_methods (`id`);ALTER TABLE services ADD KEY service_photo_id_foreign (`photo_id`);ALTER TABLE services ADD CONSTRAINT service_photo_id_foreign  FOREIGN KEY  (`photo_id`) REFERENCES photos (`id`);ALTER TABLE service_attributes ADD KEY service_attribute_service_id_foreign (`service_id`);ALTER TABLE service_attributes ADD CONSTRAINT service_attribute_service_id_foreign  FOREIGN KEY  (`service_id`) REFERENCES services (`id`);ALTER TABLE service_attribute_values ADD KEY service_attribute_value_service_attribute_id_foreign (`service_attribute_id`), ADD KEY service_attribute_value_service_plan_duration_id_foreign (`service_plan_duration_id`);ALTER TABLE service_attribute_values ADD CONSTRAINT service_attribute_value_service_attribute_id_foreign  FOREIGN KEY  (`service_attribute_id`) REFERENCES service_attributes (`id`), ADD CONSTRAINT service_attribute_value_service_plan_duration_id_foreign  FOREIGN KEY  (`service_plan_duration_id`) REFERENCES service_plan_durations (`id`);ALTER TABLE service_plans ADD KEY service_plan_service_id_foreign (`service_id`);ALTER TABLE service_plans ADD CONSTRAINT service_plan_service_id_foreign  FOREIGN KEY  (`service_id`) REFERENCES services (`id`);ALTER TABLE service_plan_durations ADD KEY service_plan_duration_service_plan_id_foreign (`service_plan_id`);ALTER TABLE service_plan_durations ADD CONSTRAINT service_plan_duration_service_plan_id_foreign  FOREIGN KEY  (`service_plan_id`) REFERENCES service_plans (`id`);ALTER TABLE service_plan_prices ADD KEY service_plan_price_service_plan_duration_id_foreign (`service_plan_duration_id`);ALTER TABLE service_plan_prices ADD CONSTRAINT service_plan_price_service_plan_duration_id_foreign  FOREIGN KEY  (`service_plan_duration_id`) REFERENCES service_plan_durations (`id`);ALTER TABLE sessions ADD KEY session_user_id_foreign (`user_id`);ALTER TABLE sessions ADD CONSTRAINT session_user_id_foreign  FOREIGN KEY  (`user_id`) REFERENCES users (`id`);ALTER TABLE subscriptions ADD KEY subscription_client_id_foreign (`client_id`), ADD KEY subscription_executive_id_foreign (`executive_id`), ADD KEY subscription_service_plan_duration_id_foreign (`service_plan_duration_id`);ALTER TABLE subscriptions ADD CONSTRAINT subscription_client_id_foreign  FOREIGN KEY  (`client_id`) REFERENCES clients (`id`), ADD CONSTRAINT subscription_executive_id_foreign  FOREIGN KEY  (`executive_id`) REFERENCES executives (`id`), ADD CONSTRAINT subscription_service_plan_duration_id_foreign  FOREIGN KEY  (`service_plan_duration_id`) REFERENCES service_plan_durations (`id`);
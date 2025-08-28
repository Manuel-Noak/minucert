CREATE TABLE `certification` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`provider_id` bigint NOT NULL,
	`course_id` bigint,
	`price` bigint,
	`currency_code` varchar(10),
	`title` varchar(100),
	`thumbnail_link` varchar(255),
	`category` varchar(100),
	CONSTRAINT `certification_id` PRIMARY KEY(`id`),
	CONSTRAINT `UQ_certification_provider_course_id` UNIQUE(`provider_id`,`course_id`)
);
--> statement-breakpoint
CREATE TABLE `certification_provider` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(100) NOT NULL,
	`website` varchar(255),
	`api_base_url` varchar(100),
	CONSTRAINT `certification_provider_id` PRIMARY KEY(`id`),
	CONSTRAINT `UQ_certification_provider_name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `certification_purchase_transaction` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`certification_order_id` bigint NOT NULL,
	`amount` bigint NOT NULL,
	`status` varchar(50) NOT NULL,
	`payment_gateway_status` varchar(50),
	`transaction_reference` varchar(100) NOT NULL,
	`payment_id` varchar(100),
	`payment_gateway` varchar(50) NOT NULL,
	`response_body` text,
	CONSTRAINT `certification_purchase_transaction_id` PRIMARY KEY(`id`),
	CONSTRAINT `UQ_certification_purchase_transaction_order_id` UNIQUE(`certification_order_id`),
	CONSTRAINT `UQ_certification_purchase_transaction_reference` UNIQUE(`transaction_reference`)
);
--> statement-breakpoint
CREATE TABLE `certification_purchase_transaction_log` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`certification_order_id` bigint NOT NULL,
	`amount` bigint NOT NULL,
	`status` varchar(50) NOT NULL,
	`payment_gateway_status` varchar(50),
	`transaction_reference` varchar(100) NOT NULL,
	`payment_id` varchar(100),
	`payment_gateway` varchar(50) NOT NULL,
	`response_body` text,
	CONSTRAINT `certification_purchase_transaction_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`first_name` varchar(100),
	`last_name` varchar(100),
	`email` varchar(100) NOT NULL,
	`phone_number` varchar(20),
	`address` text,
	CONSTRAINT `customer_id` PRIMARY KEY(`id`),
	CONSTRAINT `UQ_customer_email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `customer_certification_orders` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`customer_id` bigint NOT NULL,
	`certification_id` bigint NOT NULL,
	`status` varchar(50) NOT NULL,
	`reference` varchar(100) NOT NULL,
	CONSTRAINT `customer_certification_orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `UQ_customer_certification_orders_reference` UNIQUE(`reference`)
);
--> statement-breakpoint
CREATE TABLE `customer_complaints` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`first_name` varchar(100),
	`last_name` varchar(100),
	`email` varchar(100) NOT NULL,
	`complaint` text,
	CONSTRAINT `customer_complaints_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `internal_user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created_on` timestamp NOT NULL DEFAULT (now()),
	`last_modified_on` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`first_name` varchar(100),
	`last_name` varchar(100),
	`email` varchar(100) NOT NULL,
	`username` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`roles` varchar(255),
	CONSTRAINT `internal_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `UQ_internal_user_username` UNIQUE(`username`),
	CONSTRAINT `UQ_internal_user_email` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `certification` ADD CONSTRAINT `certification_provider_id_certification_provider_id_fk` FOREIGN KEY (`provider_id`) REFERENCES `certification_provider`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `certification_purchase_transaction` ADD CONSTRAINT `certification_purchase_transaction_certification_order_id_customer_certification_orders_id_fk` FOREIGN KEY (`certification_order_id`) REFERENCES `customer_certification_orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `certification_purchase_transaction_log` ADD CONSTRAINT `certification_purchase_transaction_log_certification_order_id_customer_certification_orders_id_fk` FOREIGN KEY (`certification_order_id`) REFERENCES `customer_certification_orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_certification_orders` ADD CONSTRAINT `customer_certification_orders_customer_id_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_certification_orders` ADD CONSTRAINT `customer_certification_orders_certification_id_certification_id_fk` FOREIGN KEY (`certification_id`) REFERENCES `certification`(`id`) ON DELETE no action ON UPDATE no action;
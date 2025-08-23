CREATE TABLE `admin` (
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `paidUsers` (
	`fullname` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`program` varchar(255) NOT NULL,
	`status` varchar(255) DEFAULT 'Unfulfilled'
);

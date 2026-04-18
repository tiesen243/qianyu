CREATE TABLE `posts` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);

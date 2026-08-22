ALTER TABLE `users` ADD COLUMN `passwordHash` varchar(255);
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);

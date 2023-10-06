CREATE TABLE `announcements` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `writer` varchar(255),
  `content` text,
  `created_at` timestamp,
  `hit` 0
);

CREATE TABLE `freeboards` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `writer` varchar(255),
  `content` text,
  `created_at` timestamp,
  `hit` 0
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `username` varchar(255),
  `birth` date,
  `gender` enum,
  `level` 1,
  `registered_at` timestamp
);

ALTER TABLE `users` ADD FOREIGN KEY (`username`) REFERENCES `freeboards` (`writer`);

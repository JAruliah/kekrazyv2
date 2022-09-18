/*
  Warnings:

  - You are about to drop the `MatchHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MatchHistory` DROP FOREIGN KEY `MatchHistory_userId_fkey`;

-- DropTable
DROP TABLE `MatchHistory`;

-- CreateTable
CREATE TABLE `Matches` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endedAt` DATETIME(3) NOT NULL,
    `accuracy` INTEGER NOT NULL,
    `WPM` INTEGER NOT NULL,
    `completionTime` INTEGER NOT NULL,
    `mode` VARCHAR(191) NOT NULL,
    `quoteLength` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

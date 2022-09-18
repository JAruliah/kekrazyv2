-- CreateTable
CREATE TABLE `MatchHistory` (
    `id` VARCHAR(191) NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endedAt` DATETIME(3) NOT NULL,
    `accuracy` INTEGER NOT NULL,
    `WPM` INTEGER NOT NULL,
    `completionTime` INTEGER NOT NULL,
    `mode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MatchHistory_matchId_key`(`matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MatchHistory` ADD CONSTRAINT `MatchHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

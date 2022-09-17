/*
  Warnings:

  - You are about to drop the column `matchId` on the `MatchHistory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `MatchHistory_matchId_key` ON `MatchHistory`;

-- AlterTable
ALTER TABLE `MatchHistory` DROP COLUMN `matchId`;

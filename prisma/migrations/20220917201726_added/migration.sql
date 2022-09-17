/*
  Warnings:

  - You are about to drop the column `accountId` on the `MatchHistory` table. All the data in the column will be lost.
  - Added the required column `quoteLength` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MatchHistory` DROP COLUMN `accountId`,
    ADD COLUMN `quoteLength` INTEGER NOT NULL;

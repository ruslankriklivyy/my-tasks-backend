/*
  Warnings:

  - You are about to drop the column `access_token` on the `tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "access_token";

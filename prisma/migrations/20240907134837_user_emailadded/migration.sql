/*
  Warnings:

  - You are about to drop the column `userId` on the `Tutorial` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tutorial" DROP CONSTRAINT "Tutorial_userId_fkey";

-- AlterTable
ALTER TABLE "Tutorial" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tutorial" ADD CONSTRAINT "Tutorial_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

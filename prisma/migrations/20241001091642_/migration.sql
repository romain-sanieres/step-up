/*
  Warnings:

  - You are about to drop the column `rating` on the `ProductSize` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Commentary" ADD COLUMN     "rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductSize" DROP COLUMN "rating";

/*
  Warnings:

  - You are about to drop the column `productImg` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `productPrice` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `productSize` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `size` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "productImg",
DROP COLUMN "productName",
DROP COLUMN "productPrice",
DROP COLUMN "productSize",
ADD COLUMN     "size" TEXT NOT NULL;

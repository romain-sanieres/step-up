/*
  Warnings:

  - Added the required column `title` to the `Commentary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commentary" ADD COLUMN     "title" TEXT NOT NULL;

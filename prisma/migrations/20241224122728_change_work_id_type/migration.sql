/*
  Warnings:

  - The primary key for the `Work` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Work" DROP CONSTRAINT "Work_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Work_pkey" PRIMARY KEY ("id");

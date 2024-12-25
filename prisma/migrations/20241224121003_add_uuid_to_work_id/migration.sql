/*
  Warnings:

  - The primary key for the `Work` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Work` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Work" DROP CONSTRAINT "Work_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Work_pkey" PRIMARY KEY ("id");

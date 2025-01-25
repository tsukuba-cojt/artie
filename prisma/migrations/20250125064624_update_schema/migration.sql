-- CreateEnum
CREATE TYPE "ShowArtieModel" AS ENUM ('PAINTING', 'DEFAULT', 'ANGRY', 'RUSHING', 'SURPRISE', 'TIRED', 'UMM');

-- CreateTable
CREATE TABLE "PickUpWork" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "showArtieModel" "ShowArtieModel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PickUpWork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PickUpWork_workId_idx" ON "PickUpWork"("workId");

-- AddForeignKey
ALTER TABLE "PickUpWork" ADD CONSTRAINT "PickUpWork_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

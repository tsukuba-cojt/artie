-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "descriptionAudioUrl" TEXT,
ADD COLUMN     "firstComment" TEXT,
ADD COLUMN     "funFactComments" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "suggestComments" TEXT[] DEFAULT ARRAY[]::TEXT[];

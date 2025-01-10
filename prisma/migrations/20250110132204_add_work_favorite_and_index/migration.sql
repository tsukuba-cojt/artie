-- CreateTable
CREATE TABLE "WorkFavorite" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "workId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkFavorite_workId_idx" ON "WorkFavorite"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkFavorite_userId_workId_key" ON "WorkFavorite"("userId", "workId");

-- CreateIndex
CREATE INDEX "Conversation_userId_idx" ON "Conversation"("userId");

-- CreateIndex
CREATE INDEX "Conversation_workId_idx" ON "Conversation"("workId");

-- CreateIndex
CREATE INDEX "Conversation_createdAt_idx" ON "Conversation"("createdAt");

-- CreateIndex
CREATE INDEX "Work_authorId_idx" ON "Work"("authorId");

-- AddForeignKey
ALTER TABLE "WorkFavorite" ADD CONSTRAINT "WorkFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkFavorite" ADD CONSTRAINT "WorkFavorite_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

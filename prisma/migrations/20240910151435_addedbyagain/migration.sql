-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_addedById_fkey";

-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "addedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

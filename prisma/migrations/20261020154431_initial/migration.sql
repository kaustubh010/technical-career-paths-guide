/*
  Warnings:

  - You are about to drop the `change_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parcels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "change_logs" DROP CONSTRAINT "change_logs_parcel_id_fkey";

-- DropForeignKey
ALTER TABLE "change_logs" DROP CONSTRAINT "change_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "parcels" DROP CONSTRAINT "parcels_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hashed_password" DROP NOT NULL;

-- DropTable
DROP TABLE "change_logs";

-- DropTable
DROP TABLE "parcels";

-- CreateTable
CREATE TABLE "career_assessments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT,
    "skills" TEXT[],
    "interests" TEXT[],
    "recommended_path_id" TEXT NOT NULL,
    "recommended_path_title" TEXT NOT NULL,
    "reason" TEXT,
    "matched_items" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_career_paths" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "path_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'exploring',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saved_career_paths_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "career_assessments_user_id_idx" ON "career_assessments"("user_id");

-- CreateIndex
CREATE INDEX "career_assessments_recommended_path_id_idx" ON "career_assessments"("recommended_path_id");

-- CreateIndex
CREATE INDEX "saved_career_paths_user_id_idx" ON "saved_career_paths"("user_id");

-- CreateIndex
CREATE INDEX "saved_career_paths_path_id_idx" ON "saved_career_paths"("path_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_career_paths_user_id_path_id_key" ON "saved_career_paths"("user_id", "path_id");

-- AddForeignKey
ALTER TABLE "career_assessments" ADD CONSTRAINT "career_assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_career_paths" ADD CONSTRAINT "saved_career_paths_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

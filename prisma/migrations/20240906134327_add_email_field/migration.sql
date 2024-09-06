/*
  Warnings:

  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");

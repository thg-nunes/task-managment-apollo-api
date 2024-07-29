-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'CONPLETED', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "LabelPriority" AS ENUM ('HIGH', 'MIDIUM', 'LOW');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "status" "TaskStatus",
    "priority" "LabelPriority",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

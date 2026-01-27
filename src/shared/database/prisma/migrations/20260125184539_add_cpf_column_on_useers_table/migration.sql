/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `transactions_id_key` ON `transactions`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_id_key` ON `users`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_cpf_key` ON `users`(`cpf`);

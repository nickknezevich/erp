/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Suplier_name_key` ON `Suplier`;

-- AlterTable
ALTER TABLE `Suplier` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(255) NOT NULL,
    MODIFY `token` VARCHAR(255) NOT NULL,
    MODIFY `first_name` VARCHAR(255) NOT NULL,
    MODIFY `last_name` VARCHAR(255) NOT NULL,
    MODIFY `full_name` VARCHAR(255) NULL,
    MODIFY `picture` VARCHAR(255) NULL;

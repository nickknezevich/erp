/*
  Warnings:

  - You are about to drop the column `inventory_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_inventory_id_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `inventory_id`;

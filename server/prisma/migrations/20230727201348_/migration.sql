/*
  Warnings:

  - You are about to drop the column `warehouse_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_warehouse_id_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `warehouse_id`;

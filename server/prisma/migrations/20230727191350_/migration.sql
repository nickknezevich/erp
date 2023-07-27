/*
  Warnings:

  - Added the required column `product_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_inventory_id_fkey`;

-- AlterTable
ALTER TABLE `Inventory` ADD COLUMN `product_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Package` MODIFY `description` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

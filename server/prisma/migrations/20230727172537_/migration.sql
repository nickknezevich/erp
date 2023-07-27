/*
  Warnings:

  - You are about to drop the column `cost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `min_qty` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inventory_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventory_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `cost`,
    DROP COLUMN `min_qty`,
    DROP COLUMN `qty`,
    ADD COLUMN `inventory_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `cost` DOUBLE NOT NULL,
    `qty` DOUBLE NOT NULL,
    `min_qty` DOUBLE NOT NULL,
    `warehouse_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Inventory_warehouse_id_key`(`warehouse_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_inventory_id_key` ON `Product`(`inventory_id`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_inventory_id_fkey` FOREIGN KEY (`inventory_id`) REFERENCES `Inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_warehouse_id_fkey` FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

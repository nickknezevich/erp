/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_suplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_warehouse_id_fkey`;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `city` VARCHAR(255) NULL,
    ADD COLUMN `zip` INTEGER NULL;

-- AlterTable
ALTER TABLE `Warehouse` ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `city` VARCHAR(255) NULL,
    ADD COLUMN `zip` INTEGER NULL;

-- DropTable
DROP TABLE `Address`;

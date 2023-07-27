/*
  Warnings:

  - You are about to drop the `Widget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Widget` DROP FOREIGN KEY `Widget_package_id_fkey`;

-- DropForeignKey
ALTER TABLE `Widget` DROP FOREIGN KEY `Widget_suplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `Widget` DROP FOREIGN KEY `Widget_warehouse_id_fkey`;

-- DropTable
DROP TABLE `Widget`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `cost` DOUBLE NOT NULL,
    `qty` DOUBLE NOT NULL,
    `min_qty` DOUBLE NOT NULL,
    `warehouse_id` INTEGER NOT NULL,
    `suplier_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_warehouse_id_key`(`warehouse_id`),
    UNIQUE INDEX `Product_suplier_id_key`(`suplier_id`),
    UNIQUE INDEX `Product_package_id_key`(`package_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_warehouse_id_fkey` FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_suplier_id_fkey` FOREIGN KEY (`suplier_id`) REFERENCES `Suplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

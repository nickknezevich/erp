/*
  Warnings:

  - You are about to drop the column `package_id` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_package_id_fkey`;

-- AlterTable
ALTER TABLE `Package` ADD COLUMN `product_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `package_id`;

-- CreateIndex
CREATE UNIQUE INDEX `Package_product_id_key` ON `Package`(`product_id`);

-- AddForeignKey
ALTER TABLE `Package` ADD CONSTRAINT `Package_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `suplier_id` on the `products_suppliers` table. All the data in the column will be lost.
  - Added the required column `supplier_id` to the `products_suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products_suppliers` DROP FOREIGN KEY `products_suppliers_suplier_id_fkey`;

-- AlterTable
ALTER TABLE `products_suppliers` DROP COLUMN `suplier_id`,
    ADD COLUMN `supplier_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `products_suppliers` ADD CONSTRAINT `products_suppliers_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

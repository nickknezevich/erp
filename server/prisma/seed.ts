import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const warehouse_austin = await prisma.warehouse.create({
        data: {
            name: 'AUS',
            address: '2817 Oak St',
            zip: 78701,
            city: "Austin"
        },
    })

    const warehouse_atlanta = await prisma.warehouse.create({
        data: {
            name: 'ATL',
            address: '4321 Peachtree Street',
            zip: 30303,
            city: "Atlanta"
        },
    })

    const warehouse_mineapolis = await prisma.warehouse.create({
        data: {
            name: 'MSP',
            address: '5678 Maple Avenue',
            zip: 55408,
            city: "Minneapolis-Saint Paul"
        },
    })

    const supplier_little_traps = await prisma.supplier.create({
        data: {
            name: 'Little Traps',
            address: '7162 First St',
            zip: 55408,
            city: "Minneapolis-Saint Paul"
        },
    })

    const supplier_big_traps = await prisma.supplier.create({
        data: {
            name: 'Big Traps',
            address: '922 Main Ave',
            zip: 91039,
            city: "Los Angeles"
        },
    })

    const supplier_raytheon = await prisma.supplier.create({
        data: {
            name: 'Raytheon',
            address: '19922 Douglas Rd',
            zip: 89128,
            city: "Las Vegas"
        },
    })

    const customer_1 = await prisma.customer.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Home Place',
            address: '7162 First St',
            zip: 55408,
            city: "Minneapolis-Saint Paul"
        },
    })

    const customer_2 = await prisma.customer.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Bug Store',
            address: '922 Main Ave',
            zip: 91039,
            city: "Los Angeles"
        },
    })

    const customer_3 = await prisma.customer.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'No Bears R Us',
            address: '19922 Douglas Rd',
            zip: 89128,
            city: "Las Vegas"
        },
    })

    const product_1 = await prisma.product.create({
        data: {
            name: 'Ant Trap',
            description: 'Description for Ant Trap',
            price: 9,
        },
    })

    const product_2 = await prisma.product.create({
        data: {
            name: 'Mouse Trap',
            description: 'Description for Mouse Trap',
            price: 5,
        },
    })

    const product_3 = await prisma.product.create({
        data: {
            name: 'Bear Trap',
            description: 'Description for Bear Trap',
            price: 220,
        },
    })

    const product_4 = await prisma.product.create({
        data: {
            name: 'Elephant Trap',
            description: 'Description for Elephant Trap',
            price: 110,
        },
    })

    const product_5 = await prisma.product.create({
        data: {
            name: 'Moose Trap',
            description: 'Description for Moose Trap',
            price: 110,
        },
    })

    const product_customer_1 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_1.id }
            },
            customer: {
                connect: { id: customer_1.id }
            }
        },
    })

    const product_customer_2 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_1.id }
            },
            customer: {
                connect: { id: customer_2.id }
            }
        },
    })

    const product_customer_3 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            customer: {
                connect: { id: customer_1.id }
            }
        },
    })

    const product_customer_4 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            customer: {
                connect: { id: customer_2.id }
            }
        },
    })

    const product_customer_5 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            customer: {
                connect: { id: customer_1.id }
            }
        },
    })

    const product_customer_6 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            customer: {
                connect: { id: customer_3.id }
            }
        },
    })

    const product_customer_7 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_5.id }
            },
            customer: {
                connect: { id: customer_1.id }
            }
        },
    })

    const product_customer_8 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_5.id }
            },
            customer: {
                connect: { id: customer_3.id }
            }
        },
    })

    const product_customer_9 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_4.id }
            },
            customer: {
                connect: { id: customer_1.id }
            }
        },
    })

    const product_customer_10 = await prisma.productCustomer.create({
        data: {
            product: {
                connect: { id: product_4.id }
            },
            customer: {
                connect: { id: customer_3.id }
            }
        },
    })
    
    const product_supplier_1 = await prisma.productSupplier.create({
        data: {
            product: {
                connect: { id: product_1.id }
            },
            supplier: {
                connect: { id: supplier_little_traps.id }
            }
        },
    })

    const product_supplier_2 = await prisma.productSupplier.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            supplier: {
                connect: { id: supplier_little_traps.id }
            }
        },
    })

    const product_supplier_3 = await prisma.productSupplier.create({
        data: {
            product: {
                connect: { id: product_3.id }
            },
            supplier: {
                connect: { id: supplier_big_traps.id }
            }
        },
    })

    const product_supplier_4 = await prisma.productSupplier.create({
        data: {
            product: {
                connect: { id: product_5.id }
            },
            supplier: {
                connect: { id: supplier_big_traps.id }
            }
        },
    })

    const product_supplier_5 = await prisma.productSupplier.create({
        data: {
            product: {
                connect: { id: product_4.id }
            },
            supplier: {
                connect: { id: supplier_raytheon.id }
            }
        },
    })

    const packaging_bag_of_10 = await prisma.package.create({
        data: {
            name: 'Bag of 10',
            description: 'Bag of 10',
        },
    })

    const packaging_bag_of_5 = await prisma.package.create({
        data: {
            name: 'Bag of 5',
            description: 'Bag of 5',
        },
    })

    const packaging_box_of_5 = await prisma.package.create({
        data: {
            name: 'Box of 5',
            description: 'Box of 5',
        },
    })

    const packaging_box_of_2 = await prisma.package.create({
        data: {
            name: 'Box of 2',
            description: 'Box of 2',
        },
    })

    const packaging_box_of_1 = await prisma.package.create({
        data: {
            name: 'Box of 1',
            description: 'Box of 1',
        },
    })

    const packaging_crate_of_1 = await prisma.package.create({
        data: {
            name: 'Crate of 1',
            description: 'Bag of 1',
        },
    })

    const packaging_crate_of_2= await prisma.package.create({
        data: {
            name: 'Crate of 2',
            description: 'Bag of 2',
        },
    })

    const product_package_1 = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_1.id }
            },
            package: {
                connect: { id: packaging_bag_of_10.id }
            }
        },
    })

    const product_package_2 = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_1.id }
            },
            package: {
                connect: { id: packaging_bag_of_5.id }
            }
        },
    })

    const product_package_3 = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            package: {
                connect: { id: packaging_box_of_2.id }
            }
        },
    })

    const product_package_4 = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            package: {
                connect: { id: packaging_box_of_1.id }
            }
        },
    })

    const product_package_5 = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            package: {
                connect: { id: packaging_bag_of_10.id }
            }
        },
    })

    const product_package_6 = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_2.id }
            },
            package: {
                connect: { id: packaging_bag_of_5.id }
            }
        },
    })

    const product_package_7 = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_3.id }
            },
            package: {
                connect: { id: packaging_box_of_1.id }
            }
        },
    })

    const product_package_8  = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_3.id }
            },
            package: {
                connect: { id: packaging_box_of_5.id }
            }
        },
    })

    const product_package_9  = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_5.id }
            },
            package: {
                connect: { id: packaging_box_of_1.id }
            }
        },
    })

    const product_package_10  = await prisma.productPackage.create({
        data: {
            product: {
                connect: { id: product_4.id }
            },
            package: {
                connect: { id: packaging_crate_of_1.id }
            }
        },
    })

    const inventory_1 = await prisma.inventory.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: '',
            description: '',
            qty: 112,
            min_qty: 50,
            cost: 0.50,
            warehouse: {
                connect: { id: warehouse_austin.id, }
            },
            product: {
                connect: { id: product_1.id }
            }
        },
    })

    const inventory_2 = await prisma.inventory.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: '',
            description: '',
            qty: 200,
            min_qty: 50,
            cost: 1,
            warehouse: {
                connect: { id: warehouse_atlanta.id, }
            },
            product: {
                connect: { id: product_2.id }
            }
        },
    })

    const inventory_3 = await prisma.inventory.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: '',
            description: '',
            qty: 10,
            min_qty: 10,
            cost: 40,
            warehouse: {
                connect: { id: warehouse_mineapolis.id, }
            },
            product: {
                connect: { id: product_3.id }
            }
        },
    })

    const inventory_4 = await prisma.inventory.upsert({
        where: { id: 4 },
        update: {},
        create: {
            name: '',
            description: '',
            qty: 5,
            min_qty: 5,
            cost: 50,
            warehouse: {
                connect: { id: warehouse_mineapolis.id, }
            },
            product: {
                connect: { id: product_5.id }
            }
        },
    })

    const inventory_5 = await prisma.inventory.upsert({
        where: { id: 5 },
        update: {},
        create: {
            name: '',
            description: '',
            qty: 3,
            min_qty: 5,
            cost: 90,
            warehouse: {
                connect: { id: warehouse_mineapolis.id, }
            },
            product: {
                connect: { id: product_4.id }
            }
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
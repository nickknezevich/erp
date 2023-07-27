import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const warehouse_austin = await prisma.warehouse.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Austin 1',
            address: '2817 Oak St',
            zip: 78701,
            city: "Austin"
        },
    })

    const warehouse_atlanta = await prisma.warehouse.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Atlanta Main',
            address: '4321 Peachtree Street',
            zip: 30303,
            city: "Atlanta"
        },
    })

    const warehouse_mineapolis = await prisma.warehouse.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'Minneapolis-Saint Paul - 1',
            address: '5678 Maple Avenue',
            zip: 55408,
            city: "Minneapolis-Saint Paul"
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
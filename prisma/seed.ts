import {prisma} from '../server/utils/db'

async function seed() {
    
}

seed().then(() => {
    prisma.$disconnect()
})
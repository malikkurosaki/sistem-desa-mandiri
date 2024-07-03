import { seederUser, seederUserRole } from '@/module/seeder';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
   // USER ROLE
   for (let data of seederUserRole) {
      await prisma.userRole.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name
         },
         create: {
            id: data.id,
            name: data.name,
            desc: data.desc
         },
      })
   }

   // USER 
   for (let data of seederUser) {
      await prisma.user.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name
         },
         create: {
            id: data.id,
            idUserRole: data.idUserRole,
            nik: data.nik,
            name: data.name,
            phone: data.phone,
            email: data.email,
            gender: data.gender
         },
      })
   }
}

main().then(async () => {
   await prisma.$disconnect()
}).catch(async (e) => {
   console.error(e)
   await prisma.$disconnect()
   process.exit(1)
})
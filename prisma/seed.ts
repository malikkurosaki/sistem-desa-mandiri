import { seederAdmin, seederAdminRole, seederDesa, seederGroup, seederPosition, seederTheme, seederUser, seederUserRole } from '@/module/seeder';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
   // ADMIN ROLE
   for (let data of seederAdminRole) {
      await prisma.adminRole.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name
         },
         create: {
            id: data.id,
            name: data.name,
         },
      })
   }

   // ADMIN
   for (let data of seederAdmin) {
      await prisma.admin.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name,
            idAdminRole: data.idAdminRole,
            phone: data.phone,
            email: data.email,
            gender: data.gender
         },
         create: {
            id: data.id,
            idAdminRole: data.idAdminRole,
            phone: data.phone,
            email: data.email,
            gender: data.gender,
            name: data.name
         },
      })
   }

   // THEME
   for (let data of seederTheme) {
      await prisma.colorTheme.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name,
            utama: data.utama,
            bgUtama: data.bgUtama,
            bgIcon: data.bgIcon,
            bgFiturHome: data.bgFiturHome,
            bgFiturDivision: data.bgFiturDivisi,
            bgTotalKegiatan: data.bgTotalKegiatan
         },
         create: {
            id: data.id,
            name: data.name,
            utama: data.utama,
            bgUtama: data.bgUtama,
            bgIcon: data.bgIcon,
            bgFiturHome: data.bgFiturHome,
            bgFiturDivision: data.bgFiturDivisi,
            bgTotalKegiatan: data.bgTotalKegiatan
         }
      })
   }

   // DESA
   for (let data of seederDesa) {
      await prisma.village.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name,
            desc: data.desc,
            idTheme: "theme1"
         },
         create: {
            id: data.id,
            name: data.name,
            desc: data.desc,
            idTheme: "theme1"
         }
      })
   }

   // GROUP
   for (let data of seederGroup) {
      await prisma.group.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name,
            idVillage: data.idVillage
         },
         create: {
            id: data.id,
            name: data.name,
            idVillage: data.idVillage
         }
      })
   }

   // POSITION
   for (let data of seederPosition) {
      await prisma.position.upsert({
         where: {
            id: data.id
         },
         update: {
            name: data.name,
            idGroup: data.idGroup
         },
         create: {
            id: data.id,
            name: data.name,
            idGroup: data.idGroup
         }
      })
   }

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
            idVillage: data.idVillage,
            idGroup: data.idGroup,
            idPosition: data.idPosition,
            idUserRole: data.idUserRole,
            nik: data.nik,
            name: data.name,
            // phone: data.phone,
            email: data.email,
            gender: data.gender
         },
         create: {
            id: data.id,
            idVillage: data.idVillage,
            idGroup: data.idGroup,
            idPosition: data.idPosition,
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
import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _, { ceil } from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";


// HOME
export async function GET(request: Request) {
   try {
      let allData
      const user = await funGetUserByCookies()
      const { searchParams } = new URL(request.url);
      const kategori = searchParams.get("cat");

      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const roleUser = user.idUserRole
      const idVillage = user.idVillage
      const idGroup = user.idGroup


      if (kategori == "kegiatan") {
         let kondisi

         // klo perbekel == semua grup
         if (roleUser == "supadmin") {
            kondisi = {
               isActive: true,
               idVillage: idVillage,
               Group: {
                  isActive: true,
               }
            }
         } else {
            kondisi = {
               isActive: true,
               idGroup: idGroup
            }
         }

         const data = await prisma.project.findMany({
            skip: 0,
            take: 5,
            where: kondisi,
            select: {
               id: true,
               title: true,
               desc: true,
               status: true,
               createdAt: true,
               ProjectTask: {
                  where: {
                     isActive: true
                  },
                  select: {
                     title: true,
                     status: true
                  }
               }
            },
            orderBy: {
               createdAt: "desc"
            }
         })

         allData = data.map((v: any) => ({
            ..._.omit(v, ["ProjectTask", "createdAt"]),
            progress: ceil((v.ProjectTask.filter((i: any) => i.status == 1).length * 100) / v.ProjectTask.length),
            createdAt: moment(v.dateStart).format("LL")
         }))

      } else if (kategori == "division") {
         let kondisi

         // klo perbekel == semua grup
         if (roleUser == "supadmin") {
            kondisi = {
               isActive: true,
               idVillage: idVillage,
               Group: {
                  isActive: true,
               }
            }
         } else {
            kondisi = {
               isActive: true,
               idGroup: idGroup
            }
         }

         const data = await prisma.division.findMany({
            where: kondisi,
            select: {
               id: true,
               name: true,
               DivisionProject: {
                  where: {
                     isActive: true,
                     NOT: {
                        status: 3
                     }
                  }
               }
            },
         })

         const format = data.map((v: any) => ({
            ..._.omit(v, ["DivisionProject"]),
            jumlah: v.DivisionProject.length,
         }))

         allData = _.orderBy(format, 'jumlah', 'desc').slice(0, 5)

      } else if (kategori == "progress") {

      } else if (kategori == "dokumen") {

      } else if (kategori == "event") {
         let kondisi

         // klo perbekel == semua grup
         if (roleUser == "supadmin") {
            kondisi = {
               isActive: true,
               dateStart: new Date(),
               Division: {
                  idVillage: idVillage,
                  Group: {
                     isActive: true,
                  }
               }
            }
         } else {
            kondisi = {
               isActive: true,
               dateStart: new Date(),
               Division: {
                  idGroup: idGroup
               }
            }
         }


         const data = await prisma.divisionCalendar.findMany({
            skip: 0,
            take: 5,
            where: kondisi,
            select: {
               id: true,
               idDivision: true,
               title: true,
               desc: true,
               status: true,
               timeStart: true,
               dateStart: true,
               timeEnd: true,
               dateEnd: true,
               createdAt: true,
               User: {
                  select: {
                     name: true
                  }
               }
            },
            orderBy: {
               createdAt: 'desc'
            }
         })

         allData = data.map((v: any) => ({
            ..._.omit(v, ["User"]),
            user_name: v.User.name,
            timeStart: moment.utc(v.timeStart).format('HH:mm'),
            timeEnd: moment.utc(v.timeEnd).format('HH:mm')
         }))

      } else if (kategori == "discussion") {
         let kondisi

         // klo perbekel == semua grup
         if (roleUser == "supadmin") {
            kondisi = {
               isActive: true,
               status: 1,
               Division: {
                  idVillage: idVillage,
                  Group: {
                     isActive: true,
                  }
               }
            }
         } else {
            kondisi = {
               isActive: true,
               status: 1,
               Division: {
                  idGroup: idGroup
               }
            }
         }

         const data = await prisma.divisionDisscussion.findMany({
            skip: 0,
            take: 5,
            where: kondisi,
            select: {
               id: true,
               idDivision: true,
               title: true,
               desc: true,
               createdAt: true,
               User: {
                  select: {
                     name: true
                  }
               }
            },
            orderBy: {
               createdAt: "desc"
            }
         })

         allData = data.map((v: any) => ({
            ..._.omit(v, ["createdAt", "User"]),
            date: moment(v.dateStart).format("LL"),
            user: v.User.name
         }))
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: allData }, { status: 200 });

   }
   catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}
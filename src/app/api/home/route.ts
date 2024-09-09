import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _, { ceil } from "lodash";
import moment from "moment";
import "moment/locale/id";
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
            createdAt: moment(v.createdAt).format("LL")
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
         let kondisi

         // klo perbekel == semua grup
         if (roleUser == "supadmin") {
            kondisi = {
               isActive: true,
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
               Division: {
                  idGroup: idGroup
               }
            }
         }

         const data = await prisma.divisionProject.groupBy({
            where: kondisi,
            by: ["status"],
            _count: true
         })

         const dataStatus = [{ name: 'Segera dikerjakan', status: 0 }, { name: 'Dikerjakan', status: 1 }, { name: 'Selesai dikerjakan', status: 2 }, { name: 'Dibatalkan', status: 3 }]
         const hasil: any[] = []
         let input
         for (let index = 0; index < dataStatus.length; index++) {
            const cek = data.some((i: any) => i.status == dataStatus[index].status)
            if (cek) {
               const find = ((Number(data.find((i: any) => i.status == dataStatus[index].status)?._count) * 100) / data.reduce((n, { _count }) => n + _count, 0)).toFixed(2)
               input = {
                  name: dataStatus[index].name,
                  value: find
               }
            } else {
               input = {
                  name: dataStatus[index].name,
                  value: 0
               }
            }
            hasil.push(input)
         }

         allData = hasil

      } else if (kategori == "dokumen") {
         let kondisi

         // klo perbekel == semua grup
         if (roleUser == "supadmin") {
            kondisi = {
               isActive: true,
               category: 'FILE',
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
               category: 'FILE',
               Division: {
                  idGroup: idGroup
               }
            }
         }

         const data = await prisma.divisionDocumentFolderFile.findMany({
            where: kondisi,
         })

         const groupData = _.map(_.groupBy(data, "extension"), (v: any) => ({
            file: v[0].extension,
            jumlah: v.length,
         }))

         const image = ['jpg', 'jpeg', 'png', 'heic']


         let hasilImage = {
            name: 'Gambar',
            value: 0
         }

         let hasilFile = {
            name: 'Dokumen',
            value: 0
         }

         groupData.map((v: any) => {
            if (image.some((i: any) => i == v.file)) {
               hasilImage = {
                  name: 'Gambar',
                  value: hasilImage.value + v.jumlah
               }
            } else {
               hasilFile = {
                  name: 'Dokumen',
                  value: hasilFile.value + v.jumlah
               }
            }
         })

         allData = [hasilImage, hasilFile]

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
               },
               DivisionCalendar: {
                  isActive: true
               },
            }
         } else {
            kondisi = {
               isActive: true,
               dateStart: new Date(),
               Division: {
                  idGroup: idGroup
               },
               DivisionCalendar: {
                  isActive: true
               },
            }
         }


         const data = await prisma.divisionCalendarReminder.findMany({
            skip: 0,
            take: 5,
            where: kondisi,
            select: {
               id: true,
               idCalendar: true,
               timeStart: true,
               dateStart: true,
               timeEnd: true,
               dateEnd: true,
               createdAt: true,
               status: true,
               DivisionCalendar: {
                  select: {
                     title: true,
                     desc: true,
                     User: {
                        select: {
                           name: true
                        }
                     }
                  }
               }
            },
            orderBy: [
               {
                  dateStart: 'asc'
               },
               {
                  timeStart: 'asc'
               },
               {
                  timeEnd: 'asc'
               }
            ]
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
            date: moment(v.dateStart).format("ll"),
            user: v.User.name
         }))
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: allData }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}
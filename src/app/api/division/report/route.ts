import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      const { searchParams } = new URL(request.url)
      const idGroup = searchParams.get("group")
      const division = searchParams.get("division")
      const date = searchParams.get("date")
      let grup

      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 })
      }

      if (idGroup == "null" || idGroup == undefined || idGroup == "") {
         grup = user.idGroup
      } else {
         grup = idGroup
      }

      // CHART PROGRESS
      let kondisiProgress
      if (division == "undefined") {
         kondisiProgress = {
            isActive: true,
            updatedAt: {
               lte: new Date(String(date))
            },
            Division: {
               idGroup: String(grup)
            }
         }
      } else {
         kondisiProgress = {
            isActive: true,
            idDivision: String(division),
            updatedAt: {
               lte: new Date(String(date))
            },
         }
      }

      const data = await prisma.divisionProject.groupBy({
         where: kondisiProgress,
         by: ["status"],
         _count: true
      })

      const dataStatus = [{ name: 'Segera dikerjakan', status: 0 }, { name: 'Dikerjakan', status: 1 }, { name: 'Selesai dikerjakan', status: 2 }, { name: 'Dibatalkan', status: 3 }]
      const hasilProgres: any[] = []
      let input
      for (let index = 0; index < dataStatus.length; index++) {
         const cek = data.some((i: any) => i.status == dataStatus[index].status)
         if (cek) {
            const find = ((Number(data.find((i: any) => i.status == dataStatus[index].status)?._count) * 100) / data.reduce((n, { _count }) => n + _count, 0)).toFixed(2)
            const fix = find != "100.00" ? find.substr(-2, 2) == "00" ? find.substr(0, 2) : find : "100"
            input = {
               name: dataStatus[index].name,
               value: fix
            }
         } else {
            input = {
               name: dataStatus[index].name,
               value: 0
            }
         }
         hasilProgres.push(input)
      }




      // CHART DOKUMEN
      let kondisi
      if (division == "undefined") {
         kondisi = {
            isActive: true,
            category: 'FILE',
            Division: {
               idGroup: String(grup)
            },
            createdAt: {
               lte: new Date(String(date))
            },
         }
      } else {
         kondisi = {
            isActive: true,
            category: 'FILE',
            idDivision: String(division),
            createdAt: {
               lte: new Date(String(date))
            },
         }
      }

      const dataDokumen = await prisma.divisionDocumentFolderFile.findMany({
         where: kondisi,
      })

      const groupData = _.map(_.groupBy(dataDokumen, "extension"), (v: any) => ({
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

      const hasilDokumen = [hasilImage, hasilFile]



      // CHART EVENT
      let kondisiEvent
      if (division == "undefined") {
         kondisiEvent = {
            isActive: true,
            Division: {
               idGroup: String(grup)
            },
            dateStart: new Date(String(date))
         }
      } else {
         kondisiEvent = {
            isActive: true,
            idDivision: String(division),
            dateStart: new Date(String(date))
         }
      }

      const dataEvent = await prisma.divisionCalendar.findMany({
         where: kondisiEvent,
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

      const hasilEvent = dataEvent.map((v: any) => ({
         ..._.omit(v, ["User"]),
         user_name: v.User.name,
         timeStart: moment.utc(v.timeStart).format('HH:mm'),
         timeEnd: moment.utc(v.timeEnd).format('HH:mm')
      }))


      const allData = {
         progress: hasilProgres,
         dokumen: hasilDokumen,
         event: hasilEvent
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan data", data: allData }, { status: 200 });

   }
   catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}
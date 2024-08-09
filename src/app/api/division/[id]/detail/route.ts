import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";


// GET ONE DATA DIVISI :: UNTUK TAMPIL DETAIL DIVISI (FITUR DIVISI) PADA HALAMAN DETAIL
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      let allData
      const { id } = context.params;
      const user = await funGetUserByCookies()
      const { searchParams } = new URL(request.url);
      const kategori = searchParams.get("cat");

      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.division.findUnique({
         where: {
            id: String(id),
            isActive: true
         }
      });

      if (!data) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan", }, { status: 404 });
      }

      if (kategori == "jumlah") {
         const tugas = await prisma.divisionProject.count({
            where: {
               idDivision: String(id),
               status: {
                  lte: 1
               },
               isActive: true
            }
         })

         const dokumen = await prisma.divisionDocumentFolderFile.count({
            where: {
               idDivision: String(id),
               isActive: true,
               category: "FILE"
            }
         })

         const diskusi = await prisma.divisionDisscussion.count({
            where: {
               idDivision: String(id),
               isActive: true,
               status: 1
            }
         })

         const kalender = await prisma.divisionCalendar.count({
            where: {
               idDivision: String(id),
               isActive: true,
               dateStart: {
                  lte: new Date()
               }
            }
         })


         allData = {
            tugas: tugas,
            dokumen: dokumen,
            diskusi: diskusi,
            kalender: kalender
         }
      } else if (kategori == "today-task") {
         const tugas = await prisma.divisionProjectTask.findMany({
            skip: 0,
            take: 5,
            where: {
               idDivision: String(id),
               status: 0,
               isActive: true,
               dateStart: new Date()
            },
            select: {
               id: true,
               title: true,
               dateStart: true,
               dateEnd: true,
            }
         })

         allData = tugas.map((v: any) => ({
            ..._.omit(v, ["dateStart", "dateEnd"]),
            dateStart: moment(v.dateStart).format("LL"),
            dateEnd: moment(v.dateEnd).format("LL")
         }))
      } else if (kategori == "new-file") {
         allData = await prisma.divisionDocumentFolderFile.findMany({
            skip: 0,
            take: 5,
            where: {
               idDivision: String(id),
               isActive: true,
               category: "FILE"
            },
            select: {
               id: true,
               name: true,
               extension: true,
            },
            orderBy: {
               createdAt: "desc"
            }
         })
      } else if (kategori == "new-discussion") {
         const diskusi = await prisma.divisionDisscussion.findMany({
            skip: 0,
            take: 5,
            where: {
               idDivision: String(id),
               isActive: true,
               status: 1
            },
            select: {
               id: true,
               title: true,
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

         allData = diskusi.map((v: any) => ({
            ..._.omit(v, ["createdAt", "User"]),
            date: moment(v.dateStart).format("LL"),
            user: v.User.name
         }))
      }

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: allData }, { status: 200 });
   }



   catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}
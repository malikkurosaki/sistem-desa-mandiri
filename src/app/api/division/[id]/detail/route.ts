import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
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

         allData = diskusi.map((v: any) => ({
            ..._.omit(v, ["createdAt", "User"]),
            date: moment(v.dateStart).format("ll"),
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




// MENGELUARKAN ANGGOTA DARI DIVISI
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const idDivision = context.params.id;
      const { id } = (await request.json());

      const data = await prisma.division.count({
         where: {
            id: idDivision,
            isActive: true
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Hapus anggota divisi gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.divisionMember.delete({
         where: {
            id: id,
         },
      });

      return NextResponse.json(
         {
            success: true,
            message: "Anggota divisi berhasil dihapus",
         },
         { status: 200 }
      );
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mengeluarkan anggota divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// MENGGANTI STATUS ADMIN DIVISI
export async function PUT(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const idDivision = context.params.id;
      const { id, isAdmin } = (await request.json());

      const data = await prisma.division.count({
         where: {
            id: idDivision,
            isActive: true
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Perubahan status admin gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const update = await prisma.divisionMember.update({
         where: {
            id: id,
         },
         data: {
            isAdmin: !isAdmin
         }
      });

      return NextResponse.json(
         {
            success: true,
            message: "Status admin berhasil diupdate",
         },
         { status: 200 }
      );
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mengubah status admin divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// TAMBAH ANGGOTA DIVISI
export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const member = await request.json();
      const idDivision = context.params.id;


      const data = await prisma.division.count({
         where: {
            id: idDivision,
            isActive: true
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Tambah anggota divisi gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }


      const dataMember = member.map((v: any) => ({
         ..._.omit(v, ["name"]),
         idUser: v.idUser,
         idDivision: idDivision,
      }))

      const insertMember = await prisma.divisionMember.createMany({
         data: dataMember
      })

      return NextResponse.json({ success: true, message: "Berhasil menambahkan anggota divisi" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal menambahkan anggota divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};
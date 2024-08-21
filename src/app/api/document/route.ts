import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import { NextResponse } from "next/server";


// GET ALL DOCUMENT
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }


      const { searchParams } = new URL(request.url);
      const idDivision = searchParams.get("division");
      const path = searchParams.get("path");

      const cekDivision = await prisma.division.count({
         where: {
            id: String(idDivision),
            isActive: true
         }
      })

      if (cekDivision == 0) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
      }

      if (path != "home" && path != "null" && path != "undefined" && path != "") {
         const cekPath = await prisma.divisionDocumentFolderFile.count({
            where: {
               isActive: true,
               id: String(path)
            }
         })

         if (cekPath == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan item, data tidak ditemukan" }, { status: 404 });
         }
      }




      const data = await prisma.divisionDocumentFolderFile.findMany({
         where: {
            isActive: true,
            idDivision: String(idDivision),
            path: (path == "undefined" || path == "null" || path == "" || path == null) ? "home" : path
         },
         select: {
            id: true,
            category: true,
            name: true,
            extension: true,
            path: true,
            User: {
               select: {
                  name: true
               }
            },
            createdAt: true,
            updatedAt: true
         },
         orderBy: {
            name: 'asc'
         }
      })

      const allData = data.map((v: any) => ({
         ..._.omit(v, ["User", "createdAt", "updatedAt"]),
         createdBy: v.User.name,
         createdAt: moment(v.createdAt).format("DD-MM-YYYY HH:mm"),
         updatedAt: moment(v.updatedAt).format("DD-MM-YYYY HH:mm")
      }))


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan item", data: allData, }, { status: 200 });

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan item, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}



// CREATE FOLDER
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { name, path, idDivision } = (await request.json());

      const cekDivision = await prisma.division.count({
         where: {
            id: String(idDivision),
            isActive: true
         }
      })

      if (cekDivision == 0) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
      }

      if (path != "home") {
         const cekPath = await prisma.divisionDocumentFolderFile.count({
            where: {
               isActive: true,
               id: path
            }
         })

         if (cekPath == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan path, data tidak ditemukan" }, { status: 404 });
         }
      }

      const nameFile = await prisma.divisionDocumentFolderFile.count({
         where: {
            name,
            idDivision,
            path,
            extension: "folder",
            category: "FOLDER",
            isActive: true
         }
      })


      if (nameFile > 0) {
         return NextResponse.json({ success: false, message: "Gagal membuat folder baru, folder sudah ada" }, { status: 400 });
      }

      const data = await prisma.divisionDocumentFolderFile.create({
         data: {
            name,
            path,
            idDivision,
            category: "FOLDER",
            extension: "folder",
            createdBy: user.id,
         },
      });

      return NextResponse.json({ success: true, message: "Berhasil membuat folder baru" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal membuat folder, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};


// RENAME ITEM
export async function PUT(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { name, id, path, idDivision, extension } = (await request.json());
      const cekFile = await prisma.divisionDocumentFolderFile.count({
         where: {
            id: id,
            isActive: true
         }
      })

      if (cekFile == 0) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan item, data tidak ditemukan" }, { status: 404 });
      }

      const nameFile = await prisma.divisionDocumentFolderFile.count({
         where: {
            name,
            idDivision,
            path,
            extension,
            isActive: true,
            NOT: {
               id: id
            },
         }
      })


      if (nameFile > 0) {
         return NextResponse.json({ success: false, message: "Gagal mengubah nama item, item sudah ada" }, { status: 400 });
      }

      const update = await prisma.divisionDocumentFolderFile.update({
         where: {
            id: id
         },
         data: {
            name,
         }
      })



      return NextResponse.json({ success: true, message: "Berhasil mengubah nama item" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mengubah nama item, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};


// DELETE ITEM
export async function DELETE(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await request.json()

      for (let i = 0; i < data.length; i++) {
         const id = data[i].id;
         const cekFile = await prisma.divisionDocumentFolderFile.update({
            where: {
               id: id
            },
            data: {
               isActive: false
            }
         })
      }


      return NextResponse.json({ success: true, message: "Berhasil menghapus item" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal menghapus item, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};
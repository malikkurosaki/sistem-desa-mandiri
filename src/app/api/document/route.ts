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


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: allData, }, { status: 200 });

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
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
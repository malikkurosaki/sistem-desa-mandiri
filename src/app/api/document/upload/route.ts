import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


// UPLOAD FILE
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const body = await request.formData()
      const dataBody = body.get("data")
      const file = body.get("file") as File
      const fileName = file.name


      const { idPath, idDivision } = JSON.parse(dataBody as string)

      const cekDivision = await prisma.division.count({
         where: {
            id: String(idDivision),
            isActive: true
         }
      })

      if (cekDivision == 0) {
         return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan" }, { status: 404 });
      }

      if (idPath != "home") {
         const cekPath = await prisma.divisionDocumentFolderFile.count({
            where: {
               isActive: true,
               id: idPath
            }
         })

         if (cekPath == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan path, data tidak ditemukan" }, { status: 404 });
         }
      }

      const nameFile = await prisma.divisionDocumentFolderFile.findMany({
         where: {
            idDivision,
            path: idPath,
            category: "FILE",
            isActive: true
         }
      })

      const dataOmit = nameFile.map((v: any) => ({
         ..._.omit(v, [""]),
         file: v.name + '.' + v.extension,
      }))

      const cek = dataOmit.some((i: any) => i.file == fileName)

      if (cek) {
         return NextResponse.json({ success: false, message: "Terdapat file dengan nama yang sama" }, { status: 400 });
      }


      const fExt = file.name.split(".").pop()
      const fName = file.name.replace("." + fExt, "")

      const dataInsert = await prisma.divisionDocumentFolderFile.create({
         data: {
            name: fName,
            path: idPath,
            idDivision,
            category: "FILE",
            extension: String(fExt),
            createdBy: user.id,
         },
         select: {
            id: true
         }
      });

      const root = path.join(process.cwd(), "./public/file/dokumen/");
      const nameFix = dataInsert.id + '.' + fExt
      const filePath = path.join(root, nameFix)
      // Konversi ArrayBuffer ke Buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      // Tulis file ke sistem
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({ success: true, message: "Berhasil upload file" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal upload file, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};
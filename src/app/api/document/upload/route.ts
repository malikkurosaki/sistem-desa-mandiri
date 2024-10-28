import { DIR, funUploadFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";


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
      const upload = await funUploadFile({ file: file, dirId: DIR.document })
      if (upload.success) {
         const dataInsert = await prisma.divisionDocumentFolderFile.create({
            data: {
               name: fName,
               path: idPath,
               idDivision,
               category: "FILE",
               extension: String(fExt),
               createdBy: user.id,
               idStorage: upload.data.id
            },
            select: {
               id: true
            }
         });

         // create log user
         const log = await createLogUser({ act: 'CREATE', desc: 'User mengupload file baru', table: 'divisionDocumentFolderFile', data: dataInsert.id })
         return NextResponse.json({ success: true, message: "Berhasil upload file" }, { status: 200 });
      } else {
         return NextResponse.json({ success: false, message: "Gagal upload file, coba lagi nanti" }, { status: 400 });
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal upload file, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
};
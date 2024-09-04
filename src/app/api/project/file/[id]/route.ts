import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import _ from "lodash";

// HAPUS FILE PROJECT BUKAN PAKE ISACTIVE
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }
      const { id } = context.params;
      const data = await prisma.projectFile.count({
         where: {
            id: id,
         },
      });

      if (data == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Hapus file gagal, data tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const dataRelasi = await prisma.projectFile.findUnique({
         where: {
            id: id,
         }
      })


      fs.unlink(`./public/file/project/${dataRelasi?.id}.${dataRelasi?.extension}`, (err) => { })

      const deleteRelasi = await prisma.projectFile.delete({
         where: {
            id: id,
         },
      });


      return NextResponse.json(
         {
            success: true,
            message: "File berhasil dihapus",
            data,
         },
         { status: 200 }
      );

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal menghapus file, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// CEK FILE PROJECT APAKAH PERNAH DIUPLOAD PADA PROJECT YG SAMA
export async function PUT(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }


      const { id } = context.params;
      const body = await request.formData()
      const file = body.get("file") as File
      const fileName = file.name

      const dataCek = await prisma.project.count({
         where: {
            id: id,
         },
      });

      if (dataCek == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Upload file gagal, data kegiatan tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const dataTaskFile = await prisma.projectFile.findMany({
         where: {
            idProject: id,
            isActive: true
         },
         select: {
            id: true,
            name: true,
            extension: true
         }
      })

      const dataOmit = dataTaskFile.map((v: any) => ({
         ..._.omit(v, [""]),
         file: v.name + '.' + v.extension,
      }))

      const cek = dataOmit.some((i: any) => i.file == fileName)


      if (cek) {
         return NextResponse.json({ success: false, message: "File sudah pernah diupload" }, { status: 400 });
      } else {
         return NextResponse.json({ success: true, message: "Cek berhasil" }, { status: 200 });
      }

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Upload file gagal, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


// TAMBAH FILE PROJECT
export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }


      const { id } = context.params;
      const body = await request.formData()
      const cekFile = body.has("file0")

      const dataCek = await prisma.project.count({
         where: {
            id: id,
         },
      });

      if (dataCek == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Tambah file kegiatan gagal, data tugas tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const dataProject = await prisma.project.findUnique({
         where: {
            id: id,
         },
      });



      if (cekFile) {
         const root = path.join(process.cwd(), "./public/file/project/");
         for (var pair of body.entries()) {
            if (String(pair[0]).substring(0, 4) == "file") {
               const file = body.get(pair[0]) as File
               const fExt = file.name.split(".").pop()
               const fName = file.name.replace("." + fExt, "")


               const insertToTable = await prisma.projectFile.create({
                  data: {
                     idProject: id,
                     name: fName,
                     extension: String(fExt)
                  },
                  select: {
                     id: true
                  }
               })

               const nameFix = insertToTable.id + '.' + fExt
               const filePath = path.join(root, nameFix)
               // Konversi ArrayBuffer ke Buffer
               const buffer = Buffer.from(await file.arrayBuffer());
               // Tulis file ke sistem
               fs.writeFileSync(filePath, buffer);
            }
         }
      }


      return NextResponse.json({ success: true, message: "Berhasil mengupload file kegiatan" }, { status: 200 });

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal  mengupload file, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}
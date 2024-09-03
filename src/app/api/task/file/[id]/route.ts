import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// HAPUS DETAIL FILE, HAPUS FILE DI ASSETS DAN DATABASE (BUKAN PAKE ISACTIVE)
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }
      const { id } = context.params;
      const data = await prisma.divisionProjectFile.count({
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

      const dataRelasi = await prisma.divisionProjectFile.findUnique({
         where: {
            id: id,
         }
      })

      const dataFile = await prisma.containerFileDivision.findUnique({
         where: {
            id: dataRelasi?.idFile
         }
      })

      fs.unlink(`./public/file/task/${dataFile?.id}.${dataFile?.extension}`, (err) => { })

      const deleteRelasi = await prisma.divisionProjectFile.delete({
         where: {
            id: id,
         },
      });

      const deleteFile = await prisma.containerFileDivision.delete({
         where: {
            id: dataRelasi?.idFile,
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


// TAMBAH FILE TASK DIVISI
export async function POST(request: Request, context: { params: { id: string } }) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }


      const { id } = context.params;
      const body = await request.formData()
      const cekFile = body.has("file0")

      const dataCek = await prisma.divisionProject.count({
         where: {
            id: id,
         },
      });

      if (dataCek == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Tambah file tugas gagal, data tugas tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const dataProject = await prisma.divisionProject.findUnique({
         where: {
            id: id,
         },
      });


      let fileFix: any[] = []

      if (cekFile) {
         let a = 0
         const root = path.join(process.cwd(), "./public/file/task/");
         for (var pair of body.entries()) {
            if (String(pair[0]) == "file" + a) {
               const file = body.get(pair[0]) as File
               const fExt = file.name.split(".").pop()
               const fName = file.name.replace("." + fExt, "")


               const insertToContainer = await prisma.containerFileDivision.create({
                  data: {
                     idDivision: String(dataProject?.idDivision),
                     name: fName,
                     extension: String(fExt)
                  },
                  select: {
                     id: true
                  }
               })

               const nameFix = insertToContainer.id + '.' + fExt
               const filePath = path.join(root, nameFix)
               // Konversi ArrayBuffer ke Buffer
               const buffer = Buffer.from(await file.arrayBuffer());
               // Tulis file ke sistem
               fs.writeFileSync(filePath, buffer);


               const dataFile = {
                  idProject: id,
                  idDivision: dataProject?.idDivision,
                  idFile: insertToContainer.id,
                  createdBy: user.id,
               }


               fileFix.push(dataFile)
            }
            a++
         }

         const insertFile = await prisma.divisionProjectFile.createMany({
            data: fileFix
         })
      }


      return NextResponse.json({ success: true, message: "Berhasil membuat tugas divisi" }, { status: 200 });

   } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Gagal membuat tugas divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}



// CEK FILE TASK DIVISI APAKAH PERNAH DIUPLOAD PADA TASK YG SAMA
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

      const dataCek = await prisma.divisionProject.count({
         where: {
            id: id,
         },
      });

      if (dataCek == 0) {
         return NextResponse.json(
            {
               success: false,
               message: "Upload file gagal, data tugas tidak ditemukan",
            },
            { status: 404 }
         );
      }

      const dataTaskFile = await prisma.divisionProjectFile.findMany({
         where: {
            idProject: id,
            isActive: true
         },
         select: {
            ContainerFileDivision: {
               select: {
                  name: true,
                  extension: true
               }
            }
         }
      })

      const dataOmit = dataTaskFile.map((v: any) => ({
         ..._.omit(v, ["ContainerFileDivision"]),
         file: v.ContainerFileDivision.name + '.' + v.ContainerFileDivision.extension,
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
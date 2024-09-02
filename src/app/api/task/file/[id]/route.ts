import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";
import fs from "fs";

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
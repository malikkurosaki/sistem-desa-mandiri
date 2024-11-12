import { DIR, funUploadFile, funViewDir, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import { NextResponse } from "next/server";


// GET ALL BANNER
export async function GET() {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.bannerImage.findMany({
         where: {
            isActive: true,
            idVillage: user.idVillage
         },
         orderBy: {
            createdAt: 'desc'
         }
      });

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan banner", data }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan data banner, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}


// CREATE BANNER
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const body = await request.formData()
      const file = body.get("file") as File;
      const data = body.get("data");

      const { title } = JSON.parse(data as string)

      const fExt = file.name.split(".").pop()
      const fName = file.name.replace("." + fExt, "")
      const newFile = new File([file], file.name, { type: file.type });

      const ini = funViewDir({ dirId: DIR.user })
      const upload = await funUploadFile({ file: newFile, dirId: DIR.banner })
      if (upload.success) {
         const create = await prisma.bannerImage.create({
            data: {
               title: title,
               idVillage: user.idVillage,
               extension: String(fExt),
               image: upload.data.id
            }
         })

         // create log user
         const log = await createLogUser({ act: 'CREATE', desc: 'User menambah data banner baru', table: 'bannerImage', data: user.id })

         return Response.json({ success: true, message: 'Sukses menambah data banner' }, { status: 200 });
      } else {
         return Response.json({ success: false, message: 'Gagal menambah data banner' }, { status: 200 });
      }
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menambahkan banner, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}
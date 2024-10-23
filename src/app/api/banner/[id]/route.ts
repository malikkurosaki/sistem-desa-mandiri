import { DIR, funDeleteFile, funUploadFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import { NextResponse } from "next/server";


// GET ONE BANNER
export async function GET(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params;
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const data = await prisma.bannerImage.findUnique({
         where: {
            id: String(id)
         }
      })

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan banner", data }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan banner, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}


// DELETE BANNER
export async function DELETE(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params;
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const upd = await prisma.bannerImage.update({
         where: {
            id: String(id)
         },
         data: {
            isActive: false
         }
      })


      // create log user
      const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus banner', table: 'bannerImage', data: id })

      return NextResponse.json({ success: true, message: "Berhasil menghapus banner" }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menghapus banner, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}


// UPDATE BANNER
export async function PUT(request: Request, context: { params: { id: string } }) {
   try {
      const { id } = context.params;
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const body = await request.formData()
      const file = body.get("file") as File
      const data = body.get("data")
      const { title } = JSON.parse(data as string)


      const upd = await prisma.bannerImage.update({
         where: {
            id: String(id)
         },
         data: {
            title
         },
         select: {
            image: true
         }
      })

      if (String(file) != "undefined" && String(file) != "null") {
         const fExt = file.name.split(".").pop()
         const fileName = id + '.' + fExt;
         const newFile = new File([file], fileName, { type: file.type });
         await funDeleteFile({ fileId: String(upd.image) })
         const upload = await funUploadFile({ file: newFile, dirId: DIR.banner })
         await prisma.bannerImage.update({
            where: {
               id: id
            },
            data: {
               image: upload.data.id
            }
         })
      }

      // create log user
      const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data banner', table: 'bannerImage', data: user.id })

      return NextResponse.json({ success: true, message: "Berhasil mengupdate banner" }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mengupdate banner, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
   }
}
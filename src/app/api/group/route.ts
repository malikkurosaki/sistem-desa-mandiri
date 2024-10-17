import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = true
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const villaId = user.idVillage
      const { searchParams } = new URL(request.url);
      const isActive = searchParams.get("active");
      const name = searchParams.get('search');

      const data = await prisma.group.findMany({
         where: {
            isActive: isActive == 'false' ? false : true,
            idVillage: String(villaId),
            name: {
               contains: (name == undefined || name == null) ? "" : name,
               mode: "insensitive"
            }
         },
         select: {
            id: true,
            name: true,
            isActive: true
         }
      });

      return NextResponse.json({ success: true, message: "Berhasil mendapatkan grup", data, }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan grup, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}


export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const { name } = (await request.json());
      const villaId = user.idVillage
      const data = await prisma.group.create({
         data: {
            name,
            idVillage: String(villaId)
         },
         select: {
            id: true
         }
      });

      revalidatePath('/api/group?active=true', "page")
      revalidatePath('/api/group?active=false', 'page')
      revalidatePath('/group?active=true', 'page')
      revalidateTag('group')

      // create log user
      const log = await createLogUser({ act: 'CREATE', desc: 'User membuat data grup', table: 'group', data: data.id })


      return NextResponse.json({ success: true, message: "Berhasil menambahkan grup", data, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menambahkan grup, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};
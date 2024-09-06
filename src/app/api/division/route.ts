import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";


// GET ALL DATA DIVISI == LIST DATA DIVISI
export async function GET(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      let grup
      const villaId = user.idVillage
      const roleUser = user.idUserRole
      const { searchParams } = new URL(request.url);
      const idGroup = searchParams.get("group");
      const name = searchParams.get('search');

      if (idGroup == "null" || idGroup == undefined) {
         grup = user.idGroup
      } else {
         grup = idGroup
      }


      let kondisi: any = {
         isActive: true,
         idVillage: String(villaId),
         idGroup: grup,
         name: {
            contains: (name == undefined || name == "null") ? "" : name,
            mode: "insensitive"
         }
      }

      if (roleUser != "supadmin" && roleUser != "cosupadmin" && roleUser != "admin") {
         kondisi = {
            isActive: true,
            idVillage: String(villaId),
            idGroup: grup,
            name: {
               contains: (name == undefined || name == "null") ? "" : name,
               mode: "insensitive"
            },
            DivisionMember: {
               some: {
                  isActive: true,
                  idUser: String(user.id)
               }
            }
         }
      }

      const data = await prisma.division.findMany({
         where: kondisi,
         select: {
            id: true,
            name: true,
            desc: true,
            DivisionMember: {
               where: {
                  isActive: true
               },
               select: {
                  idUser: true
               }
            }
         }
      });

      const allData = data.map((v: any) => ({
         ..._.omit(v, ["DivisionMember"]),
         jumlah_member: v.DivisionMember.length
      }))


      const filter = await prisma.group.findUnique({
         where: {
            id: grup
         },
         select: {
            id: true,
            name: true
         }
      })


      return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: allData, filter }, { status: 200 });

   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
}





// CREATE DATA DIVISI
export async function POST(request: Request) {
   try {
      const user = await funGetUserByCookies()
      if (user.id == undefined) {
         return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
      }

      const sent = (await request.json());
      const villaId = user.idVillage
      const data = await prisma.division.create({
         data: {
            name: sent.data.name,
            idVillage: String(user.idVillage),
            idGroup: sent.data.idGroup,
            desc: sent.data.desc,
            createdBy: String(user.id)
         },
         select: {
            id: true
         }
      })


      const dataMember = sent.member.map((v: any) => ({
         ..._.omit(v, ["idUser", "name"]),
         idUser: v.idUser,
         idDivision: data.id,
         isAdmin: sent.admin.some((i: any) => i == v.idUser)
      }))

      const insertMember = await prisma.divisionMember.createMany({
         data: dataMember
      })

      revalidatePath('/api/divisi/', "page")
      revalidatePath('/divisi', 'page')
      revalidateTag('divisi')

      return NextResponse.json({ success: true, message: "Berhasil menambahkan divisi", data, }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: "Gagal menambahkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
   }
};
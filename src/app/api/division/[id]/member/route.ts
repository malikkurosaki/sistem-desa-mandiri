import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";


// GET MEMBER BY ID
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const { searchParams } = new URL(request.url);
        const user = await funGetUserByCookies()
        const name = searchParams.get('search')
        if (user.id == undefined) {
           return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
  
        const data = await prisma.division.findUnique({
           where: {
              id: String(id),
              isActive: true,
           }
        });
  
        if (!data) {
           return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, data tidak ditemukan", }, { status: 404 });
        }

        const member = await prisma.divisionMember.findMany({
            where: {
               idDivision: String(id),
                isActive: true,
                User: {
                    name: {
                        contains: (name == undefined || name == null) ? "" : name,
                        mode: "insensitive",
                    }
                }
            },
            select: {
                id: true,
                isAdmin: true,
                isLeader: true,
                idUser: true,
                User: {
                   select: {
                      name: true,
                      img: true
                   }
                }
             },
             orderBy: {
                isAdmin: 'desc',
             }
        })

        const fixMember = member.map((v: any) => ({
            ..._.omit(v, ["User"]),
            name: v.User.name,
            img: v.User.img
        }))
        
        

        return NextResponse.json({ success: true, data: fixMember })

    } catch (error) {
        return NextResponse.json({ success: false, message: "Gagal mendapatkan member, data tidak ditemukan", }, { status: 404 });
    }
}
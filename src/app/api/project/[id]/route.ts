import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";


// GET ONE PROJECT
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const data = await prisma.project.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                desc: true,
                status: true,
                ProjectMember: {
                    where: {
                        isActive: true
                    },
                    select: {
                        idUser: true
                    }
                }
            }
        })

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan project", data: data, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
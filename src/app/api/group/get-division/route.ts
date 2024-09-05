import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = true
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const role = user.idUserRole
        const villaId = user.idVillage
        const group = user.idGroup
        let kondisi: any = {
            isActive: true,
            idVillage: String(villaId)
        }

        if (role != "supadmin") {
            kondisi = {
                isActive: true,
                idVillage: String(villaId),
                id: String(group)
            }
        }

        const data = await prisma.group.findMany({
            where: kondisi,
            select: {
                id: true,
                name: true,
                Division: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan grup", data, }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan grup, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
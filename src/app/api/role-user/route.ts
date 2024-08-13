import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const res = await prisma.userRole.findMany({
            where: {
                isActive: true
            },
            select: {
                id: true,
                name: true,
            },
        });

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan role user", data: res, }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan role user, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
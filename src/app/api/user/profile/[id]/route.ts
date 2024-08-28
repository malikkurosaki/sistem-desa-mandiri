import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";


// UPDATE PROFILE BY COOKIES
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params;
        const data = await request.json();
        const cek = await prisma.user.count({
            where: {
                id: id,
                nik: data.nik,
                email: data.email,
                phone: data.phone
            }
        })
        if (cek == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal mendapatkan profile, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const result = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                nik: data.nik,
                name: data.name,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan profile",
                result,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan anggota, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
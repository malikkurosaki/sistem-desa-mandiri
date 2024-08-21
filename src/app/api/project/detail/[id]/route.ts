import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";


// HAPUS DETAIL PROJECT
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params;
        const data = await prisma.projectTask.count({
            where: {
                id: id,
            },
        });

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Hapus project gagal, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const update = await prisma.projectTask.update({
            where: {
                id: id,
            },
            data: {
                isActive: false,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Project berhasil dihapus",
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal menghapus project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// EDIT STATUS DETAIL PROJECT

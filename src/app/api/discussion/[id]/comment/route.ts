import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";

// CREATE COMENT BY ID
export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params
        const { comment } = (await request.json());

        const cek = await prisma.divisionDisscussion.count({
            where: {
                id: id
            }
        })

        if (cek == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Tambah komentar gagal, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const data = await prisma.divisionDisscussionComment.create({
            data: {
                comment: comment,
                idDisscussion: id,
                createdBy: user.id
            }
        })

        return NextResponse.json({ success: true, message: "Berhasil menambah komentar", data: data, }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal menambah komentar, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
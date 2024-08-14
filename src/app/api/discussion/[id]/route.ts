import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";

// GET ONE DISCUSSION BY ID
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const {id} = context.params

        const data = await prisma.divisionDisscussion.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                desc: true,
                status: true,
                createdAt: true,
                User: {
                    select: {
                        name: true
                    }
                },
                DivisionDisscussionComment: {
                    select: {
                        id: true,
                        comment: true,
                        createdAt: true,
                        User: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: data }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        // const announcementId = searchParams.get("announcement");
        const announcement = await prisma.announcement.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                desc: true,
            },
        });
        const announcementMember = await prisma.announcementMember.findMany({
            where: {
                idAnnouncement: id,
            },
            select: {
                idAnnouncement: true,
                idGroup: true,
                idDivision: true,
                Group: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const allAnnouncementMember = announcementMember.map((v: any) => ({
            ..._.omit(v, ["Group"]),
            group: v.Group.name,
        }))

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan announcement",
                announcement, allAnnouncementMember
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan announcement, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
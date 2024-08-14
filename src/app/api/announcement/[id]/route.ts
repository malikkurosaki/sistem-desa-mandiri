import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";



// GET ONE PENGUMUMAN, UNTUK TAMPIL DETAIL PENGUMUMAN
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get('category');
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

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
                idGroup: true,
                idDivision: true,
                Group: {
                    select: {
                        name: true,
                    },
                },
                Division: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const formatMember = announcementMember.map((v: any) => ({
            ..._.omit(v, ["Group", "Division"]),
            idGroup: v.idGroup,
            idDivision: v.idDivision,
            group: v.Group.name,
            division: v.Division.name
        }))

        const fixMember = Object.groupBy(formatMember, ({ group }) => group);

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan announcement",
                data: announcement,
                member: fixMember
            },
            { status: 200 }
        );



    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan announcement, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}



// HAPUS PENGUMUMAN
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params;
        const data = await prisma.announcement.count({
            where: {
                id: id,
            },
        });

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Hapus pengumuman gagal, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const update = await prisma.announcement.update({
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
                message: "Pengumuman berhasil dihapus",
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan pengumuman, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}



//  EDIT PENGUMUMAN
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies();
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }


        const { title, desc, groups } = (await request.json());
        const { id } = context.params;

        const data = await prisma.announcement.count({
            where: {
                id: id,
            },
        });

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Hapus pengumuman gagal, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const update = await prisma.announcement.update({
            where: {
                id: id
            },
            data: {
                title,
                desc,
            },
        });

        // hapus semua member divisi pengumuman
        const hapus = await prisma.announcementMember.deleteMany({
            where: {
                idAnnouncement: id
            }
        })

        let memberDivision = []

        for (var i = 0, l = groups.length; i < l; i++) {
            var obj = groups[i].Division;
            for (let index = 0; index < obj.length; index++) {
                const element = obj[index];
                const fix = {
                    idAnnouncement: id,
                    idGroup: groups[i].id,
                    idDivision: element.id
                }
                memberDivision.push(fix)
            }
        }

        const announcementMember = await prisma.announcementMember.createMany({
            data: memberDivision,
        });

        return NextResponse.json({ success: true, message: "Berhasil mengedit pengumuman" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mengedit pengumuman, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


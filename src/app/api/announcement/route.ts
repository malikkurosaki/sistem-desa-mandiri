import { Group } from '@mantine/core';
import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies();
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const villageId = user.idVillage
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('search');
        const announcements = await prisma.announcement.findMany({
            where: {
                idVillage: String(villageId),
                isActive: true,
                title: {
                    contains: (name == undefined || name == null) ? "" : name,
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                title: true,
                desc: true,
                createdAt: true,
            },
        });

        const allData = announcements.map((v: any) => ({
            ..._.omit(v, ["createdAt"]),
            createdAt: moment(v.createdAt).format("LL")
        }))

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan pengumuman", data: allData, }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan pengumuman, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const user = await funGetUserByCookies();
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { title, desc, createBy, groups } = (await request.json());
        const villaId = user.idVillage
        const roleId = user.idUserRole

        const data = await prisma.announcement.create({
            data: {
                title,
                desc,
                idVillage: String(villaId),
                createdBy: String(roleId),
            },
            select: {
                id: true,
                title: true,
                desc: true,
                createdAt: true,
            }
        });

        const dataMember = groups.map((group: any) => ({
            idAnnouncement: data.id,
            idGroup: group.idGroup,
            idDivision: group.idDivision,
            isActive: true,
        }));

        const announcementMember = await prisma.announcementMember.createMany({
            data: dataMember,
        });

        return NextResponse.json({data, groups: announcementMember, success: true, message: "Berhasil mendapatkan pengumuman"}, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan pengumuman, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
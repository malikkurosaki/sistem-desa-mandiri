import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import moment from "moment";
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
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params;
        const { status, idProject } = (await request.json());

        const data = await prisma.projectTask.count({
            where: {
                id
            }
        })

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false, message: "Gagal mendapatkan project, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const dataCreate = await prisma.projectTask.update({
            where: {
                id
            },
            data: {
                status: status
            }
        })

        const dataTask = await prisma.projectTask.findMany({
            where: {
                isActive: true,
                idProject: idProject,
            }
        })

        const semua = dataTask.length
        const selesai = dataTask.filter((item) => item.status == 1).length
        const prosess = Math.ceil((selesai / semua) * 100)
        let statusProject = 1

        if (prosess == 100) {
            statusProject = 2
        } else if (prosess == 0) {
            statusProject = 0
        }


        const update = await prisma.project.update({
            where: {
                id: idProject
            },
            data: {
                status: statusProject
            }
        })


        return NextResponse.json({ success: true, message: "Status detail Project berhasil diupdate", data }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membatalkan project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// GET ONE DETAIL PROJECT
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params;
        const data = await prisma.projectTask.findUnique({
            where: {
                id: String(id),
                isActive: true
            }
        })

        if (!data) {
            return NextResponse.json(
                {
                    success: false, message: "Gagal mendapatkan project, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Detail project berhasil ditemukan", data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// EDIT DETAIL PROJECT
export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { id } = context.params;
        const { name, dateStart, dateEnd } = (await request.json());

        const data = await prisma.projectTask.update({
            where: {
                id
            },
            data: {
                name: name,
                dateStart: new Date(moment(dateStart).format('YYYY-MM-DD')),
                dateEnd: new Date(moment(dateEnd).format('YYYY-MM-DD')),
            }
        })

        return NextResponse.json({ success: true, message: "Detail project berhasil diupdate", data }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal membatalkan project, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
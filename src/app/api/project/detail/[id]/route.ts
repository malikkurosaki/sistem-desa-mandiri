import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
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
        const { idProject } = (await request.json());

        const data = await prisma.projectTask.count({
            where: {
                id: id,
            },
        });

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Hapus tahapan kegiatan gagal, data tidak ditemukan",
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


        const updProject = await prisma.project.update({
            where: {
                id: idProject
            },
            data: {
                status: statusProject
            }
        })

        // create log user
        const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus tahapan kegiatan', table: 'projectTask', data: String(id) })


        return NextResponse.json(
            {
                success: true,
                message: "Tahapan kegiatan berhasil dihapus",
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal menghapus tahapan kegiatan, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
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
                    success: false, message: "Gagal mendapatkan kegiatan, data tidak ditemukan",
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


        // const cek progress 
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

        // create log user
        const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate status tahapan kegiatan', table: 'projectTask', data: String(id) })

        return NextResponse.json({ success: true, message: "Status tahapan kegiatan berhasil diupdate", data }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mengupdate status tahapan kegiatan, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
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
                    success: false, message: "Gagal mendapatkan kegiatan, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Detail kegiatan berhasil ditemukan", data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan kegiatan, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
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
        const { title, dateStart, dateEnd } = (await request.json());



        const dataTask = await prisma.projectTask.count({
            where: {
                id
            }
        })

        if (dataTask == 0) {
            return NextResponse.json(
                {
                    success: false, message: "Gagal mendapatkan kegiatan, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const data = await prisma.projectTask.update({
            where: {
                id
            },
            data: {
                title,
                dateStart: new Date(moment(dateStart).format('YYYY-MM-DD')),
                dateEnd: new Date(moment(dateEnd).format('YYYY-MM-DD')),
            }
        })

        // create log user
        const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate tahapan kegiatan', table: 'projectTask', data: String(id) })

        return NextResponse.json({ success: true, message: "Detail tahapan kegiatan berhasil diupdate", data }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mengupdate detail tahapan kegiatan, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
    }
}
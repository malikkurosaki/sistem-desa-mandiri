import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// GET ONE JABATAN
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const data = await prisma.position.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                idGroup: true,
            },
        });
        if (!data) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal mendapatkan jabatan, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan jabatan",
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan jabatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}

// DELETE / ACTIVE & NON ACTIVE POSITION
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params;
        const { isActive } = (await request.json());
        const data = await prisma.position.count({
            where: {
                id: id,
            },
        });

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal delete jabatan, data tidak ditemukan",
                },
                { status: 404 }
            );
        }


        const update = await prisma.position.update({
            where: {
                id: id,
            },
            data: {
                isActive: !isActive,
            },
        });

        return NextResponse.json(
            { success: true, message: "Sukses Delete Position" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan position, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// UPDATE POSITION
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params;
        const data = await request.json();
        const cek = await prisma.position.count({
            where: {
                name: data.name,
                idGroup: data.idGroup,
            },
        });
        if (cek == 0) {
            const positions = await prisma.position.update({
                where: {
                    id: id,
                },
                data: {
                    name: data.name,
                    idGroup: data.idGroup,
                },
            });
            return NextResponse.json({ success: true, message: "Berhasil edit position", positions, }, { status: 200 });
        } else {
            return NextResponse.json(
                { success: false, message: "Position sudah ada" },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan jabatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
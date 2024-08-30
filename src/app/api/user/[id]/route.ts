import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// GET ONE MEMBER / USER 
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const users = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                nik: true,
                name: true,
                phone: true,
                email: true,
                gender: true,
                img: true,
                idGroup: true,
                isActive: true,
                idPosition: true,
                UserRole: {
                    select: {
                        name: true,
                        id: true
                    }
                },
                Position: {
                    select: {
                        name: true,
                        id: true
                    },
                },
                Group: {
                    select: {
                        name: true,
                        id: true
                    },
                },
            },
        });

        const { ...userData } = users;
        const group = users?.Group.name
        const position = users?.Position.name
        const idUserRole = users?.UserRole.id

        const result = { ...userData, group, position, idUserRole };

        const omitData = _.omit(result, ["Group", "Position", "UserRole"])

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan anggota",
                data: omitData,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan member, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// DELETE / ACTIVE & NON ACTIVE MEMBER / USER
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params;
        const { isActive } = (await request.json());
        const data = await prisma.user.count({
            where: {
                id: id,
            },
        });

        if (data == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal mendapatkan anggota, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

        const result = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                isActive: !isActive,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan anggota",
                result,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan anggota, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// UPDATE MEMBER
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params;
        console.log(id)
        
        const body = await request.formData()
        const file = body.get("file") as File
        const data = body.get("data")
        const {
            name,
            email,
            phone,
            nik,
            gender,
            idGroup,
            idPosition,
            idUserRole
        } = JSON.parse(data as string)
        // const data = await request.json();
        const cek = await prisma.user.count({
            where: {
                nik: nik,
                email: email,
                phone: phone,
                NOT: {
                    id: id
                }
            },
        });

        if (cek == 0) {
            const updates = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    nik: nik,
                    name: name,
                    phone: "62" + phone,
                    email: email,
                    gender: gender,
                    idGroup: idGroup,
                    idPosition: idPosition,
                    idUserRole: idUserRole,
                }, 
                select: {
                    img: true
                }
            });

            if (String(file) != "undefined" && String(file) != "null") {
                fs.unlink(`./public/image/user/${updates.img}`, (err) => { })
                const root = path.join(process.cwd(), "./public/image/user/");
                const fExt = file.name.split(".").pop()
                const fileName = id + '.' + fExt;
                const filePath = path.join(root, fileName);
    
                // Konversi ArrayBuffer ke Buffer
                const buffer = Buffer.from(await file.arrayBuffer());
                fs.writeFileSync(filePath, buffer);

                await prisma.user.update({
                    where: {
                        id: id
                    },
                    data: {
                        img: fileName
                    }
                })
            }

            // create log user
            const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data user', table: 'user', data: user.id })

            return Response.json(
                { success: true, message: "Sukses Update User" },
                { status: 200 }
            );
        } else {
            return Response.json({ success: false, message: "User sudah ada" }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan anggota, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
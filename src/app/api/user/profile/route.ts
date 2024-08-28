import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";


// GET PROFILE BY COOKIES
export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const data = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                nik: true,
                gender: true,
                idGroup: true,
                idPosition: true,
                Group: {
                    select: {
                        name: true
                    }
                },
                Position: {
                    select: {
                        name: true
                    }
                }
            }
        })
        const { ...userData } = data;
        const group = data?.Group.name
        const position = data?.Position.name

        const result = { ...userData, group, position };

        const omitData = _.omit(result, ["Group", "Position",])

        return NextResponse.json({ success: true, data: omitData });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
    }
    
}

// UPDATE PROFILE BY COOKIES
export async function PUT(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, phone, nik, gender } = body;
        const data = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: name,
                email: email,
                phone: phone,
                nik: nik,
                gender: gender
            }
        })

        return NextResponse.json({ success: true, message: "Berhasil ubah profile", data: data });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Gagal ubah profile" }, { status: 401 });
    }
}


import { funDeleteFile, funUploadFile, prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { createLogUser } from "@/module/user";


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
                img: true,
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
        const phone = data?.phone.substr(2)

        const omitData = _.omit(data, ["Group", "Position", "phone"])

        const result = { ...userData, group, position, phone };

        return NextResponse.json({ success: true, data: result });
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

        const body = await request.formData()
        const file = body.get("file") as File;
        const data = body.get("data");

        const { name, email, phone, nik, gender } = JSON.parse(data as string)

        const cekNIK = await prisma.user.count({
            where: {
                nik: nik,
                NOT: {
                    id: user.id
                }
            },
        });

        const cekEmail = await prisma.user.count({
            where: {
                email: email,
                NOT: {
                    id: user.id
                }
            },
        });

        const cekPhone = await prisma.user.count({
            where: {
                phone: "62" + phone,
                NOT: {
                    id: user.id
                }
            },
        });

        if (cekNIK > 0 || cekEmail > 0 || cekPhone > 0) {
            return NextResponse.json({ success: false, message: "Gagal ubah profile, NIK/email/phone sudah terdaftar" }, { status: 401 });
        }

        const update = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: name,
                email: email,
                phone: "62" + phone,
                nik: nik,
                gender: gender
            },
            select: {
                img: true
            }
        })

        if (String(file) != "undefined" && String(file) != "null") {
            const fExt = file.name.split(".").pop()
            // const fileName = user.id + '.' + fExt;
            const fileName = 'COBAAYAA.' + fExt;
            const newFile = new File([file], fileName, { type: file.type });
            console.log(fileName, newFile.name)
            await funDeleteFile({ name: fileName, dirId: "cm0x8dbwn0005bp5tgmfcthzw" })
            await funUploadFile({ file: newFile, dirId: "cm0x8dbwn0005bp5tgmfcthzw" })


            // fs.unlink(`./public/image/user/${update.img}`, (err) => { })
            // const root = path.join(process.cwd(), "./public/image/user/");
            // const fExt = file.name.split(".").pop()
            // const fileName = user.id + '.' + fExt;
            // const filePath = path.join(root, fileName);

            // // Konversi ArrayBuffer ke Buffer
            // const buffer = Buffer.from(await file.arrayBuffer());

            // // Tulis file ke sistem
            // fs.writeFileSync(filePath, buffer);

            // await prisma.user.update({
            //     where: {
            //         id: user.id
            //     },
            //     data: {
            //         img: fileName
            //     }
            // })
        }

        const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data profile', table: 'user', data: user.id })

        return NextResponse.json({ success: true, message: "Berhasil ubah profile" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Gagal ubah profile" }, { status: 500 });
    }
}


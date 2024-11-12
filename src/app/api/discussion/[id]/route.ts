import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { createLogUser } from "@/module/user";
import _ from "lodash";
import moment from "moment";
import "moment/locale/id";
import { NextResponse } from "next/server";

// GET ONE DISCUSSION BY ID
export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params

        const cek = await prisma.divisionDisscussion.count({
            where: {
                id: id
            }
        })

        if (cek == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal mendapatkan diskusi, data tidak ditemukan",
                },
                { status: 404 }
            );
        }

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
                createdBy: true,
                User: {
                    select: {
                        name: true,
                        img: true
                    }
                },
                DivisionDisscussionComment: {
                    select: {
                        id: true,
                        comment: true,
                        createdAt: true,
                        User: {
                            select: {
                                name: true,
                                img: true
                            }
                        }
                    }
                },
            }
        });

        const { ...userMember } = data
        const username = data?.User.name
        const user_img = data?.User.img
        const createdAt = moment(data?.createdAt).format("ll")
        const isCreator = data?.createdBy == user.id



        const result = { ...userMember, username, createdAt, user_img, isCreator }


        const omitData = _.omit(result, ["User"])
        const comments = omitData.DivisionDisscussionComment.map((comment: any) => {
            return { ...comment, username: comment.User.name, img: comment.User.img };
        });


        omitData.DivisionDisscussionComment = comments;
        const response = {
            ...omitData,
            totalComments: comments.length,
        };

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan diskusi", data: response, user: user.id }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan diskusi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
    }
}


// OPEN OR CLOSE DISCUSSION
export async function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params
        const { status } = (await request.json());
        let newStatus;
        if (status === 1) {
            newStatus = 2;
        } else if (status === 2) {
            newStatus = 1;
        } else {
            return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
        }

        const data = await prisma.divisionDisscussion.count({
            where: {
                id: id
            },
        });

        if (data == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan diskusi, data tidak ditemukan" }, { status: 404 });
        }

        const result = await prisma.divisionDisscussion.update({
            where: {
                id: id
            },
            data: {
                status: newStatus
            }
        });

        // create log user
        const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate status diskusi', table: 'divisionDisscussion', data: id })

        return NextResponse.json({ success: true, message: "Berhasil mengedit diskusi" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mengedit diskusi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
    }
}

// DELETE DISCUSSION
export async function PUT(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params

        const cek = await prisma.divisionDisscussion.count({
            where: {
                id: id
            },
        });

        if (cek == 0) {
            return NextResponse.json({ success: false, message: "Gagal menghapus diskusi, data tidak ditemukan" }, { status: 404 });
        }


        const data = await prisma.divisionDisscussion.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        });
        // create log user
        const log = await createLogUser({ act: 'DELETE', desc: 'User menghapus data diskusi', table: 'divisionDisscussion', data: id })

        return NextResponse.json({ success: true, message: "Berhasil menghapus diskusi", user: user.id }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal menghapus diskusi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
    }
}


// EDIT DISCUSSION
export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const { id } = context.params
        const { title, desc } = (await request.json());

        const data = await prisma.divisionDisscussion.count({
            where: {
                id: id
            },
        });

        if (data == 0) {
            return NextResponse.json({ success: false, message: "Gagal mengedit diskusi, data tidak ditemukan" }, { status: 404 });
        }

        const update = await prisma.divisionDisscussion.update({
            where: {
                id: id
            },
            data: {
                desc: desc
            }
        });

        // create log user
        const log = await createLogUser({ act: 'UPDATE', desc: 'User mengupdate data diskusi', table: 'divisionDisscussion', data: id })
        return NextResponse.json({ success: true, message: "Berhasil mengedit diskusi" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mengedit diskusi, coba lagi nanti (error: 500)", reason: (error as Error).message, }, { status: 500 });
    }
}

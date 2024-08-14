import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { stat } from "fs";
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
                User: {
                    select: {
                        name: true
                    }
                },
                DivisionDisscussionComment: {
                    select: {
                        id: true,
                        comment: true,
                        createdAt: true,
                        User: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
            }
        });

        const { ...userMember } = data
        const username = data?.User.name
        const createdAt = moment(data?.createdAt).format("LL")



        const result = { ...userMember, username, createdAt }


        const omitData = _.omit(result, ["User"])
        const comments = omitData.DivisionDisscussionComment.map((comment: any) => {
            return { ...comment, username: comment.User.name };
        });


        omitData.DivisionDisscussionComment = comments;
        const response = {
            ...omitData,
            totalComments: comments.length,
        };

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan divisi", data: response }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan divisi, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}


// ONE OR CLOSE DISCUSSION
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
            return NextResponse.json({ success: false, message: "Gagal mendapatkan discussion, data tidak ditemukan" }, { status: 404 });
        }

        const result = await prisma.divisionDisscussion.update({
            where: {
                id: id
            },
            data: {
                status: newStatus
            }
        });
        return NextResponse.json({ success: true, message: "Berhasil Update discussion" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan discussion, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
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
        const data = await prisma.divisionDisscussion.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        });
        return NextResponse.json({ success: true, message: "Berhasil Delete discussion" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan discussion, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
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
            return NextResponse.json({ success: false, message: "Gagal mendapatkan discussion, data tidak ditemukan" }, { status: 404 });
        }

        const update = await prisma.divisionDisscussion.update({
            where: {
                id: id
            },
            data: {
                desc: desc
            }
        });
        return NextResponse.json({ success: true, message: "Berhasil Edit discussion" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan discussion, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}

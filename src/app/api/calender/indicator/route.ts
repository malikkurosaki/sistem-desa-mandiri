import { funGetUserByCookies } from "@/module/auth";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);

        const id = searchParams.get("id");

        return NextResponse.json({ success: true, data: null }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "" }, { status: 401 });
    }
}









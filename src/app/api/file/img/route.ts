import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'

export async function GET(request: Request) {
    let fl;

    try {
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get('cat');
        const file = searchParams.get('file');
        const jenis = searchParams.get('jenis');
        fl = fs.readFileSync(`./public/${jenis}/${kategori}/${file}`)
    } catch (err: any) {
        throw err;
    }

    return new NextResponse(fl, {
        headers: {
            "Content-Type": "image/png"
        }
    })

}
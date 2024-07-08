import { getListAnggota } from "@/module/division/lib/division/get_list_anggota";

export async function GET() {
    const listAnggota = await getListAnggota()
    return Response.json(listAnggota)
}
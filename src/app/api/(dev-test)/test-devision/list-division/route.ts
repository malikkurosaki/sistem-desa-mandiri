import { getListDevision } from "@/module/division/lib/division/get_list_devision"

export async function GET() {
    const list_devision = await getListDevision()
    return Response.json(list_devision)
}
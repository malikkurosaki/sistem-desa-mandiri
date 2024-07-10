import { getListGroup } from "@/module/division/lib/division/get_list_group"

export async function GET() {
    const listGroup = await getListGroup()
    return Response.json(listGroup)
}
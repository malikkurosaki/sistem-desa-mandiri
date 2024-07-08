import { getCountDivision } from "@/module/division/lib/division/get_count_devision"
export async function GET() {
    const countDivision = getCountDivision()
    return Response.json({ count: countDivision })
}
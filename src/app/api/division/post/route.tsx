import { apiDivision } from "@/module/division/api/api_division";
export async function POST(req: Request) {
    return apiDivision(req, "POST")
}
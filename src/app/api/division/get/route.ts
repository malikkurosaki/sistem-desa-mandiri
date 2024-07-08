import { apiDivision } from "@/module/division/api/api_division";
export async function GET(req: Request) {
    return apiDivision(req, "GET")
}
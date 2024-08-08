import { apiDivision } from "@/module/division_new";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
    return apiDivision(req, "GET")
}
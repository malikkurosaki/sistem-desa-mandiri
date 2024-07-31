import { apiDivision } from "@/module/division_new";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return apiDivision(req, "GET")
}
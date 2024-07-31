import { apiDivision } from "@/module/division_new";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return apiDivision(req, "POST")
}
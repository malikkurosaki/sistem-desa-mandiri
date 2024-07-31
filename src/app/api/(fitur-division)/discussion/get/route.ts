import { apiDiscussion } from "@/module/division_new";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return apiDiscussion(req, "GET")
}
import { apiGroup } from "@/module/group";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return apiGroup(req, "GET")
}
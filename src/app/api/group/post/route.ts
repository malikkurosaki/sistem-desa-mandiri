import { apiGroup } from "@/module/group";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return apiGroup(req, "POST")
}
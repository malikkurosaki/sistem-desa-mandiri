
import { apiUser } from "@/module/user";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return apiUser(req, "POST")
}
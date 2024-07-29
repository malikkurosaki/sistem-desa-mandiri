
import { apiUser } from "@/module/user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return apiUser(req, "GET")
}
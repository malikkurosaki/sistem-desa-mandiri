import { apiAnnouncement } from "@/module/announcement";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return apiAnnouncement(req, "GET")
}
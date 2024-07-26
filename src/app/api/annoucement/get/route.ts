import { apiAnnouncement } from "@/module/announcement";

export async function GET(req: Request) {
    return apiAnnouncement(req, "GET")
}
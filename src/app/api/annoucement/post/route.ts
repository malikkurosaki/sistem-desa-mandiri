import { apiAnnouncement } from "@/module/announcement";

export async function POST(req: Request) {
  return apiAnnouncement(req, "POST");
}

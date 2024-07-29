import { apiAnnouncement } from "@/module/announcement";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return apiAnnouncement(req, "POST");
}

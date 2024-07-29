import { NextRequest } from "next/server";

export async function getAllAnnouncement(req: NextRequest) {
  try {
    return Response.json({
      success: true,
    });
  } catch (error) {}
}

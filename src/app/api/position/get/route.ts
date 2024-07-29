import { apiPosition } from "@/module/position";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return apiPosition(req, "GET");
}

import { apiPosition } from "@/module/position";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return apiPosition(req, "POST");
}

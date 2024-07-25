import { apiPosition } from "@/module/position";

export async function POST(req: Request) {
  return apiPosition(req, "POST");
}

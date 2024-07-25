import { apiPosition } from "@/module/position";

export async function GET(req: Request) {
  return apiPosition(req, "GET");
}

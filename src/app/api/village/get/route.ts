import { apiViilage } from "@/module/village";

export async function GET(req: Request) {
  return apiViilage(req, "GET");
}

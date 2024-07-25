import { apiViilage } from "@/module/village";

export async function POST(req: Request) {
  return apiViilage(req, "POST");
}

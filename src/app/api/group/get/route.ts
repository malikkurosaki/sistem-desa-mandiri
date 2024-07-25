import { apiGroup } from "@/module/group";

export async function GET(req: Request) {
    return apiGroup(req, "GET")
}
import { apiGroup } from "@/module/group";

export async function POST(req: Request) {
    return apiGroup(req, "POST")
}
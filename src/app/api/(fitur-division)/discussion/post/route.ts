import { apiDiscussion } from "@/module/division_new";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   return apiDiscussion(req, "POST")
}
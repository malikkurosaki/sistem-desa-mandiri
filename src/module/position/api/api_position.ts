import { NextRequest } from "next/server";
import { API_INDEX_POSITION } from "./api_index";


type Method = "GET" | "POST";
export async function apiPosition(req: NextRequest, method: Method) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const act = API_INDEX_POSITION.find((v) => v.path === path && v.method === method);
  if (!path)
    return Response.json({ success: false, message: "page not found" }, { status: 404 });
  if (act) return act.bin(req);

  return Response.json({ success: false, message: "404" });
}
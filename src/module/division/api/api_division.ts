import { API_INDEX } from "./api_index";
type Method = "GET" | "POST";

export async function apiDivision(req: Request, method: Method) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const act = API_INDEX.find((v) => v.path === path && v.method === method);
  if (!path)
    return Response.json({ message: "page not found" }, { status: 404 });
  if (act) return act.bin(req);

  return Response.json({ message: "404" });
}

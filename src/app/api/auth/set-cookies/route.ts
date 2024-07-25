import { pwd_key_config } from "@/module/_global";
import { sealData } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const { user } = await req.json();
  const encryptedUserData = await sealData(user, { password: pwd_key_config });

  cookies().set({
    name: "sessionCookie",
    value: encryptedUserData,
  });

  return Response.json({ success: true });
}

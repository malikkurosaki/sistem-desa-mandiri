import { prisma, pwd_key_config } from "@/module/_global";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  const sessionCookie = cookies().get("sessionCookieSDM");
  const userId = await unsealData(sessionCookie!.value, {
    password: pwd_key_config,
  });

  const user = await prisma.user.findUnique({
    where: {
      id: String(userId),
    },
  });

  return Response.json(user);
}

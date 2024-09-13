'use server'

import { pwd_key_config, prisma } from "@/module/_global";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

export default async function funGetUserByCookies() {
   const sessionCookie = cookies().get("sessionCookieSDM");
   const userId = await unsealData(sessionCookie!.value, {
      password: pwd_key_config,
   });

   const user = await prisma.user.findUnique({
      where: {
         id: String(userId),
      },
   });

   const village = await prisma.village.findUnique({
      where: {
         id: user?.idVillage
      }
   })

   const warna = await prisma.colorTheme.findUnique({
      where: {
         id: String(village?.idTheme)
      }
   })

   return {
      id: user?.id,
      idUserRole: user?.idUserRole,
      name: user?.name,
      idVillage: user?.idVillage,
      idGroup: user?.idGroup,
      idPosition: user?.idPosition,
      theme: warna
   };
}
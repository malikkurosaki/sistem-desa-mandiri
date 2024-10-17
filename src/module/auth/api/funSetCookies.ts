'use server'
import { sealData } from "iron-session";
import { cookies } from "next/headers";
import { prisma, pwd_key_config } from "@/module/_global";
import { createLogUser } from "@/module/user";

export default async function funSetCookies({ user }: { user: string }) {
   try {
      const encryptedUserData = await sealData(user, { password: pwd_key_config });

      // data user
      const dataUser = await prisma.user.findUnique({
         where: {
            id: user
         },
         select: {
            isFirstLogin: true
         }
      })

      if (dataUser?.isFirstLogin) {
         await prisma.user.update({
            where: {
               id: user
            },
            data: {
               isFirstLogin: false
            }
         })
      }

      // set cookies
      cookies().set({
         name: "sessionCookieSDM",
         value: encryptedUserData,
      });

      const log = await createLogUser({ act: 'LOGIN', desc: 'User masuk ke program', table: 'user', data: '' })

      return { success: true, message: "Login berhasil!", pertamaLogin: dataUser?.isFirstLogin };
   } catch (error) {
      console.error(error);
      return { message: "Internal Server Error", success: false };
   }
}
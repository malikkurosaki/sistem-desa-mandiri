import { prisma } from "@/module/_global";
import { funDetectCookies, funGetUserByCookies } from "@/module/auth";

export default async function createLogUser({ act, desc, table, data }: { act: string, desc: string, table: string, data: string }) {
   try {

      // cek cookies 
      const cek = await funDetectCookies()
      if (cek) {
         const user = await funGetUserByCookies()

         await prisma.userLog.create({
            data: {
               idUser: String(user.id),
               action: act,
               desc: desc,
               idContent: data,
               tbContent: table
            }
         })

         return { success: true, message: "Success" }
      }

      return { success: true, message: "Success" }

   } catch (error) {
      console.error(error)
      return { success: false, message: "Internal Server Error" }
   }
}
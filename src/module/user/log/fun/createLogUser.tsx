import { prisma } from "@/module/_global";

export default async function createLogUser({ act, desc, table, data }: { act: string, desc: string, table: string, data: string }) {
   try {

      // diambil dari cookies
      const user = 'devAmalia'

      await prisma.userLog.create({
         data: {
            idUser: user,
            action: act,
            desc: desc,
            idContent: data,
            tbContent: table
         }
      })

      return { success: true, message: "Success" }

   } catch (error) {
      console.log(error)
      return { success: false, message: "Internal Server Error" }
   }
}
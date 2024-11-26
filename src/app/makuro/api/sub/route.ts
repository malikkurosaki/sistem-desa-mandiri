import { prisma } from "@/module/_global"

export async function POST(req: Request) {
   const { user, subscription } = await req.json()
   console.log(user, subscription)
   const upsert = await prisma.subscribe.upsert({
      where: {
         idUser: user
      },
      create: {
         idUser: user,
         subscription: JSON.stringify(subscription)
      },
      update: {
         subscription: JSON.stringify(subscription)
      }
   })

   return new Response(JSON.stringify(upsert))

}
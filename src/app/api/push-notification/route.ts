import { prisma } from "@/module/_global"
import { WibuServerPush } from 'wibu-pkg'

WibuServerPush.init({
   NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
   VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY!,
})

// UNTUK SUBSCRIBE USER DEVICE
export async function POST(req: Request) {
   const { user, subscription } = await req.json()
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


// UNTUK KIRIM NOTIFIKASI
export async function PUT(req: Request) {
   const sub = await prisma.subscribe.findMany()
   const subs: PushSubscription[] = sub.map((v) => JSON.parse(v.subscription)) as PushSubscription[]

   const kirim = await WibuServerPush.sendMany({
      subscriptions: subs as any,
      data: {
         body: "ini test ",
         title: "test notif",
         link: "/",
         variant: "notification"
      }
   })

   return new Response(JSON.stringify(kirim))

}
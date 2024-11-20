import { WibuServerPush } from "wibu-pkg";

export async function funSendWebPush({ sub, message }: { sub: { idUser: string, subscription: string }[], message: { body: string, title: string } }) {
   try {
      const subs: PushSubscription[] = sub.map((v) => JSON.parse(v.subscription)) as PushSubscription[]

      const kirim = await WibuServerPush.sendMany({
         subscriptions: subs as any,
         data: {
            body: message.body,
            title: message.title,
            link: "/home?cat=notification",
            variant: "notification"
         }
      })

      if (kirim) {
         return { success: true, message: "Berhasil mengirim notifikasi" }
      }

      return { success: false, message: "Gagal mengirim notifikasi" }
   } catch (error) {
      console.error("Send web push notification error", error);
      return { success: false, message: "Gagal mengirim notifikasi" }
   }
}
'use client'
import { WibuPermissionProvider, WibuPushNotificationHandler } from 'wibu-pkg'

const NEXT_PUBLIC_VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
export function PushProvider({ user }: { user: string }) {
   if (!user) {
      return <div>tunggu user</div>
   }
   return <>
      <WibuPermissionProvider requiredPermissions={["notifications"]}>
         <WibuPushNotificationHandler
            NEXT_PUBLIC_VAPID_PUBLIC_KEY={NEXT_PUBLIC_VAPID_PUBLIC_KEY}
            onMessage={(msg) => {
               console.log(msg)
            }}
            onSubscribe={(subscription) => {
               fetch("/api/push-notification/", {
                  method: "POST",
                  body: JSON.stringify({
                     user,
                     subscription
                  })
               })
            }}
         />
      </WibuPermissionProvider>
   </>
}
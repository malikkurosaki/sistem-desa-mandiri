'use client'

import { useHookstate } from "@hookstate/core"
import { WibuPermissionProvider, WibuPushNotificationHandler } from "wibu-pkg"
import { subState } from "./_lib/state"

export default function Layout({ children }: { children: React.ReactNode }) {
   const { set: setSubcribe } = useHookstate(subState)
   return <WibuPermissionProvider requiredPermissions={["notifications"]}>
      <WibuPushNotificationHandler
         NEXT_PUBLIC_VAPID_PUBLIC_KEY={process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!}
         onSubscribe={(sub) => {
            setSubcribe(sub)
         }} />
      {children}
   </WibuPermissionProvider>
}
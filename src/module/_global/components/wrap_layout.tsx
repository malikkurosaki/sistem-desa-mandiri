'use client'
import { useHookstate } from "@hookstate/core";
import { globalNotifPage, globalRole, TEMA } from "../bin/val_global";
import { useShallowEffect } from "@mantine/hooks";
import { useEffect } from "react";
import mtqq_client from "../bin/mqtt_client";

export default function WrapLayout({ children, role, theme, user }: { children: React.ReactNode, role: any, theme: any, user: any }) {
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)
   const notifLoadPage = useHookstate(globalNotifPage)

   useEffect(() => {
      roleLogin.set(role)
      tema.set(theme)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [role, theme])


   useEffect(() => {
      mtqq_client.on("connect", () => {
         console.log('connect layout')
         mtqq_client.subscribe("app_SDM")
      })

      mtqq_client.on("message", (topic, message) => {
         const data = JSON.parse(message.toString())

         console.log('notif mtqq',data)

         // console.log('notif mtqq==',data)
         // if (data.user == user) {
         //    notifLoadPage.set({
         //       load: !notifLoadPage.get(),
         //       category: data.category
         //    })
         // }
      })
   })
   return (
      <>
         {children}
      </>
   );
}
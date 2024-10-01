'use client'
import { useHookstate } from "@hookstate/core";
import { globalNotifPage, globalRole, TEMA } from "../bin/val_global";
import { useShallowEffect } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useWibuRealtime } from "wibu-realtime";
import NotificationCustome from "./notification_custome";

export default function WrapLayout({ children, role, theme, user }: { children: React.ReactNode, role: any, theme: any, user: any }) {
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)
   const notifLoadPage = useHookstate(globalNotifPage)
   const [tampilNotif, setTampilNotif] = useState(false)
   const [data, setData] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: 'padahariminggukuturutayahkekotanaikdelmanistimewakududukdimuka',
      project: "sdm"
   })

   useEffect(() => {
      roleLogin.set(role)
      tema.set(theme)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [role, theme])

   useShallowEffect(() => {
      if (data) {
         setTampilNotif(true)

         setTimeout(() => {
            setTampilNotif(false);
         }, 3000);
      }
   }, [data])

   return (
      <>
         {/* {JSON.stringify(data)} */}
         {
            tampilNotif &&
            <NotificationCustome
               title={data?.title}
               desc={data?.desc}
               onClick={() => { '' }}
               onClose={() => { '' }}
            />
         }

         {children}
      </>
   );
}
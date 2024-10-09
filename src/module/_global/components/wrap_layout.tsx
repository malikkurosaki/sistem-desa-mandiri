'use client'
import { useHookstate } from "@hookstate/core";
import { globalNotifPage, globalRole, keyWibu, TEMA } from "../bin/val_global";
import { useShallowEffect } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useWibuRealtime } from "wibu-realtime";
import NotificationCustome from "./notification_custome";
import { useRouter } from "next/navigation";
import { globalParamJumlahNotif } from "@/module/home";

export default function WrapLayout({ children, role, theme, user }: { children: React.ReactNode, role: any, theme: any, user: any }) {
   const router = useRouter()
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)
   const notifLoadPage = useHookstate(globalNotifPage)
   const [tampilNotif, setTampilNotif] = useState(false)
   const paramNotif = useHookstate(globalParamJumlahNotif)
   const [data, setData] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   useEffect(() => {
      roleLogin.set(role)
      tema.set(theme)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [role, theme])

   useShallowEffect(() => {
      if (data && data.some((i: any) => i.idUserTo == user)) {
         setTampilNotif(true)
         paramNotif.set(!paramNotif.get())
         setTimeout(() => {
            setTampilNotif(false);
         }, 4000);
      }
   }, [data])


   function onClickNotif(category: string, content: string) {
      router.push('/' + category + '/' + content)
   }

   return (
      <>
         {
            tampilNotif &&
            <NotificationCustome
               title={data.filter((i: any) => i.idUserTo == user)[0]?.title}
               desc={data.filter((i: any) => i.idUserTo == user)[0]?.desc}
               onClick={() => { onClickNotif(data.filter((i: any) => i.idUserTo == user)[0]?.category, data.filter((i: any) => i.idUserTo == user)[0]?.idContent) }}
               onClose={() => { '' }}
            />
         }
         {children}
      </>
   );
}
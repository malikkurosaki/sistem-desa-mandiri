'use client'
import { globalParamJumlahNotif } from "@/module/home";
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWibuRealtime } from "wibu-realtime";
import { globalNotifPage, globalRole, keyWibu, TEMA } from "../bin/val_global";
import NotificationCustome from "./notification_custome";

export default function WrapLayout({ children, role, theme, user, village }: { children: React.ReactNode, role: any, theme: any, user: any, village: any }) {
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
   const path = usePathname()


   useEffect(() => {
      roleLogin.set(role)
      tema.set(theme)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [role, theme])

   useShallowEffect(() => {
      if (data && data.some((i: any) => i.idUserTo == user)) {
         if (data.some((i: any) => i.category == path.substring(1))) {
            notifLoadPage.set({
               category: path.substring(1),
               load: true
            })
         } else {
            setTampilNotif(true)
            paramNotif.set(!paramNotif.get())
            setTimeout(() => {
               setTampilNotif(false);
            }, 4000);
         }
      }

      if (data && data.some((v: any) => v.category == "applied-theme" && v.user != user && v.village == village)) {
         tema.set(data[0]?.theme)
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
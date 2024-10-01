'use client'
import { useHookstate } from "@hookstate/core";
import { globalNotifPage, globalRole, TEMA } from "../bin/val_global";
import { useShallowEffect } from "@mantine/hooks";
import { useEffect } from "react";

export default function WrapLayout({ children, role, theme, user }: { children: React.ReactNode, role: any, theme: any, user: any }) {
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)
   const notifLoadPage = useHookstate(globalNotifPage)

   useEffect(() => {
      roleLogin.set(role)
      tema.set(theme)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [role, theme])

   return (
      <>
         {children}
      </>
   );
}
'use client'
import { useHookstate } from "@hookstate/core";
import { globalRole, TEMA } from "../bin/val_global";
import { useShallowEffect } from "@mantine/hooks";
import { useEffect } from "react";

export default function WrapLayout({ children, role, theme }: { children: React.ReactNode, role: any, theme:any }) {
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)

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
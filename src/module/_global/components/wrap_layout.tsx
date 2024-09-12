'use client'
import { useHookstate } from "@hookstate/core";
import { globalRole } from "../bin/val_global";
import { useShallowEffect } from "@mantine/hooks";
import { useEffect } from "react";

export default function WrapLayout({ children, role }: { children: React.ReactNode, role: any }) {
   const roleLogin = useHookstate(globalRole)

   useEffect(() => {
      roleLogin.set(role)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [role])
   return (
      <>
         {children}
      </>
   );
}
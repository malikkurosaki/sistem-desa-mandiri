'use client'
import { useHookstate } from "@hookstate/core";
import { globalRole } from "../bin/val_global";
import { useShallowEffect } from "@mantine/hooks";

export default function WrapLayout({ children, role }: { children: React.ReactNode, role: any }) {
   const roleLogin = useHookstate(globalRole)

   useShallowEffect(() => {
      roleLogin.set(role)
   }, [])
   return (
      <>
         {children}
      </>
   );
}
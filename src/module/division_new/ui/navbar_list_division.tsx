'use client'
import { globalRole, LayoutDrawer, LayoutNavbarNew, TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import DrawerDivision from "./drawer_division";

export default function NavbarListDivision() {
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)
   const [openDrawer, setOpenDrawer] = useState(false)

   return (
      <>
         <LayoutNavbarNew back='/home' title='Divisi'
            menu={
               roleLogin.get() != '' ?
                  (roleLogin.get() != "user" && roleLogin.get() != "coadmin") &&
                  <ActionIcon variant="light" onClick={() => (setOpenDrawer(true))} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                     <HiMenu size={20} color='white' />
                  </ActionIcon>
                  : <></>
            } />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDivision />
         </LayoutDrawer>
      </>
   )
}
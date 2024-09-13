'use client'
import { globalRole, LayoutDrawer, LayoutNavbarNew, TEMA, WARNA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerListMember from "./drawer_list_member";
import { useState } from "react";
import { useHookstate } from "@hookstate/core";

export default function NavbarListMember() {
   const [isOpenDrawer, setOpenDrawer] = useState(false)
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)

   return (
      <>
         <LayoutNavbarNew back="/home" title="Anggota"
            menu={(roleLogin.get() != "user") ?
               <ActionIcon onClick={() => setOpenDrawer(true)} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>
               : <></>
            }
         />
         <LayoutDrawer opened={isOpenDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerListMember />
         </LayoutDrawer>
      </>
   )
}
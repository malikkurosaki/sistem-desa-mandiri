'use client'
import { WARNA, LayoutDrawer, LayoutNavbarNew, globalRole } from "@/module/_global";
import { ActionIcon, Box } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerListPosition from "./drawer_list_position";
import { useState } from "react";
import { useHookstate } from "@hookstate/core";

export default function NavbarListPosition() {
   const [isOpen, setOpen] = useState(false)
   const roleLogin = useHookstate(globalRole)
   return (
      <>
         <LayoutNavbarNew back="/home" title="Jabatan"
            menu={(roleLogin.get() != "user") ?
               <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>
               : <></>
            }
         />
         <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
            <DrawerListPosition onCreated={() => {
               setOpen(false)
            }} />
         </LayoutDrawer>
      </>
   );
}
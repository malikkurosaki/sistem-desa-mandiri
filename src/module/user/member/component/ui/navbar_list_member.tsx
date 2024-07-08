'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerListMember from "./drawer_list_member";
import { useState } from "react";

export default function NavbarListMember() {
   const [isOpenDrawer, setOpenDrawer] = useState(false)
   return (
      <>
         <LayoutNavbarNew back="/home" title="Anggota"
            menu={
               <ActionIcon onClick={() => setOpenDrawer(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>
            }
         />
         <LayoutDrawer opened={isOpenDrawer} title={'MENU'} onClose={() => setOpenDrawer(false)}>
            <DrawerListMember />
         </LayoutDrawer>
      </>
   )
}
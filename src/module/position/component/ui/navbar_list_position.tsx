'use client'
import { WARNA, LayoutDrawer, LayoutNavbarNew } from "@/module/_global";
import { ActionIcon, Box } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerListPosition from "./drawer_list_position";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NavbarListPosition() {
   const [isOpen, setOpen] = useState(false)
   return (
      <>
         <LayoutNavbarNew back="/home" title="Jabatan"
            menu={
               <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>
            }
         />
         <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
            <DrawerListPosition onCreated={() => {
               setOpen(false)
               // toast.success('Sukses! data tersimpan')
            }} />
         </LayoutDrawer>
      </>
   );
}
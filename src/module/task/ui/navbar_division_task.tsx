'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import DrawerDivisionTask from "./drawer_division_task";
import { useParams } from "next/navigation";

export default function NavbarDivisionTask() {
   const [openDrawer, setOpenDrawer] = useState(false)
   const param = useParams<{ id: string}>()
   return (
      <>
         <LayoutNavbarNew back={`/division/${param.id}`} title="Divisi - Tugas"
            menu={
               <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>
            }
         />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDivisionTask />
         </LayoutDrawer>
      </>
   )
}
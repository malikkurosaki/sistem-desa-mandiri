'use client'
import { LayoutNavbarNew, WARNA, LayoutDrawer } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import DrawerListDiscussion from "./drawer_list_discussion";
import { useParams } from "next/navigation";

export default function NavbarListDiscussion() {
   const [openDrawer, setOpenDrawer] = useState(false)
   const param = useParams<{ id: string }>()
   return (
      <>
         <LayoutNavbarNew back={`/division/${param.id}`} title="Diskusi"
            menu={
               <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>
            }
         />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerListDiscussion />
         </LayoutDrawer>
      </>
   );
}
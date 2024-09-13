'use client'
import { LayoutNavbarNew, LayoutDrawer, TEMA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import DrawerListDiscussion from "./drawer_list_discussion";
import { useParams } from "next/navigation";
import { useHookstate } from "@hookstate/core";

export default function NavbarListDiscussion() {
   const [openDrawer, setOpenDrawer] = useState(false)
   const param = useParams<{ id: string }>()
   const tema = useHookstate(TEMA)
   return (
      <>
         <LayoutNavbarNew back={`/division/${param.id}`} title="Diskusi"
            menu={
               <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
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
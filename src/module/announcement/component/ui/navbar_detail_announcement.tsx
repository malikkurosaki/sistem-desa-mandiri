'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon, Box } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerDetailAnnouncement from "./drawer_detail_announcement";
import { useState } from "react";

export default function NavbarDetailAnnouncement() {
   const [isOpenDrawer, setOpenDrawer] = useState(false)
   return (
      <Box>
         <LayoutNavbarNew back="" title="Pengumuman"
            menu={
               <ActionIcon onClick={() => setOpenDrawer(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>}
         />
         <LayoutDrawer opened={isOpenDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDetailAnnouncement onDeleted={() => setOpenDrawer(false)} />
         </LayoutDrawer>
      </Box>
   )
}
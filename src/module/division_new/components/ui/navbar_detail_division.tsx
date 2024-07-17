'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon, Box } from "@mantine/core";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import DrawerDetailDivision from "./drawer_detail_division";

export default function NavbarDetailDivision() {
   const [openDrawer, setOpenDrawer] = useState(false)
   return (
      <Box>
         <LayoutNavbarNew back="" title={"Divisi kerohanian"} menu={
            <ActionIcon variant="light" onClick={() => (setOpenDrawer(true))} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
               <HiMenu size={20} color='white' />
            </ActionIcon>
         } />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDetailDivision />
         </LayoutDrawer>
      </Box>


   );
}
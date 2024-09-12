'use client'
import { globalRole, LayoutDrawer, LayoutNavbarNew, TEMA, WARNA } from "@/module/_global";
import { ActionIcon, Box } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerDetailAnnouncement from "./drawer_detail_announcement";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useHookstate } from "@hookstate/core";

export default function NavbarDetailAnnouncement() {
   const [isOpenDrawer, setOpenDrawer] = useState(false)
   const router = useRouter()
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)
   return (
      <Box>
         <LayoutNavbarNew back="/announcement/" title="Pengumuman"
            menu={
               (roleLogin.get() != "user" && roleLogin.get() != "coadmin") ?
                  <ActionIcon onClick={() => setOpenDrawer(true)} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                     <HiMenu size={20} color='white' />
                  </ActionIcon>
                  : <></>
            }
         />
         <LayoutDrawer opened={isOpenDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDetailAnnouncement onDeleted={(val) => {
               if (val) {
                  router.replace('/announcement')
                  setOpenDrawer(false)
               }
            }} />
         </LayoutDrawer>
      </Box>
   )
}
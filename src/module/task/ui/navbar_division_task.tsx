'use client'
import { globalRole, LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import DrawerDivisionTask from "./drawer_division_task";
import { useParams } from "next/navigation";
import { useHookstate } from "@hookstate/core";
import { globalIsAdminDivision } from "@/module/division_new";

export default function NavbarDivisionTask() {
   const [openDrawer, setOpenDrawer] = useState(false)
   const param = useParams<{ id: string }>()
   const roleLogin = useHookstate(globalRole)
   const adminLogin = useHookstate(globalIsAdminDivision)

   return (
      <>
         <LayoutNavbarNew back={`/division/${param.id}`} title="Divisi - Tugas"
            menu={((roleLogin.get() != "user" && roleLogin.get() != "coadmin") || adminLogin.get()) ?
               <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>
               : <></>
            }
         />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDivisionTask />
         </LayoutDrawer>
      </>
   )
}
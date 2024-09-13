'use client'
import { globalRole, LayoutDrawer, LayoutNavbarNew, TEMA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import DrawerDetailDiscussion from "./drawer_detail_discussion";
import { useParams } from "next/navigation";
import { useHookstate } from "@hookstate/core";

export default function NavbarDetailDiscussion({id, status, idDivision}: {id: string, status: number, idDivision:string}) {
   const [openDrawer, setOpenDrawer] = useState(false)
   const param = useParams<{ id: string }>()
   const roleLogin = useHookstate(globalRole)
   const tema = useHookstate(TEMA)
   return (
      <>
         <LayoutNavbarNew back={`/division/${param.id}/discussion/`} title="Diskusi "
            menu={
               <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                  <HiMenu size={20} color='white' />
               </ActionIcon>}
         />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDetailDiscussion onSuccess={(val) => setOpenDrawer(false)} id={id} status={status} idDivision={idDivision} />
         </LayoutDrawer>
      </>
   );
}
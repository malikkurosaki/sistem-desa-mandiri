'use client'
import { LayoutDrawer, LayoutNavbarNew, TEMA } from "@/module/_global";
import { ActionIcon, Box } from "@mantine/core";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import DrawerDetailDivision from "./drawer_detail_division";
import { funGetDivisionById } from "../lib/api_division";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";
import { useHookstate } from "@hookstate/core";

export default function NavbarDetailDivision() {
   const [openDrawer, setOpenDrawer] = useState(false)
   const param = useParams<{ id: string }>()
   const [name, setName] = useState('')
   const tema = useHookstate(TEMA)

   async function getOneData() {
      try {
         const res = await funGetDivisionById(param.id);
         if (res.success) {
            setName(res.data.division.name);
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan divisi, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.id])

   return (
      <>
         <LayoutNavbarNew back="/division" title={name} menu={
            <ActionIcon variant="light" onClick={() => (setOpenDrawer(true))} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
               <HiMenu size={20} color='white' />
            </ActionIcon>
         } />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDetailDivision />
         </LayoutDrawer>
      </>


   );
}
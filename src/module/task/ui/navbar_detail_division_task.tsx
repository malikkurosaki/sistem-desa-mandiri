'use client'
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuClipboardEdit } from "react-icons/lu";
import { funGetTaskDivisionById } from "../lib/api_task";
import { useShallowEffect } from "@mantine/hooks";

export default function NavbarDetailDivisionTask() {
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const [name, setName] = useState('')

   async function getOneData() {
      try {
         const res = await funGetTaskDivisionById(param.detail, 'data');
         if (res.success) {
            setName(res.data.title);
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan data tugas divisi, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])


   return (
      <LayoutNavbarNew back="" title={name} menu={
         <ActionIcon
            variant="light"
            bg={WARNA.bgIcon}
            size="lg"
            radius="lg"
            aria-label="Settings"
            onClick={() => router.push("/task/update/1")}
         >
            <LuClipboardEdit size={20} color="white" />
         </ActionIcon>
      } />
   )
}
'use client'
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon } from "@mantine/core";
import { useRouter } from "next/navigation";
import { LuClipboardEdit } from "react-icons/lu";

export default function NavbarDetailDivisionTask() {
   const router = useRouter()
   return (
      <LayoutNavbarNew back="" title="Tugas 1" menu={
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
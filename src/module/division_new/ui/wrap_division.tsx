'use client'
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";
import { globalIsAdminDivision } from "../lib/val_division";
import { funGetDivisionById } from "../lib/api_division";
import { useParams } from "next/navigation";
import { funGetUserByCookies } from "@/module/auth";

export default function WrapLayoutDivision({ children }: { children: React.ReactNode }) {
   const isAdmin = useHookstate(globalIsAdminDivision)
   const param = useParams<{ id: string }>()

   const getData = async () => {
      const res = await funGetDivisionById(param.id);
      const login = await funGetUserByCookies()
      const cek = res.data.member.some((i: any) => i.idUser == login.id && i.isAdmin == true)
      isAdmin.set(cek)
   }

   useShallowEffect(() => {
      getData()
   }, [])
   return (
      <>
         {children}
      </>
   );
}
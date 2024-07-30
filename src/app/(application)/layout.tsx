import { pwd_key_config } from "@/module/_global"
import { funDetectCookies } from "@/module/auth"
import { unsealData } from "iron-session"
import _ from "lodash"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
   const cookies = await funDetectCookies()
   if (!cookies) return redirect('/')

   return (
      <>
         {children}
      </>
   );
}
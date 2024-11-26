import { PushProvider } from "@/lib/PushProvider"
import { WrapLayout } from "@/module/_global"
import { funDetectCookies, funGetUserByCookies } from "@/module/auth"
import _ from "lodash"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
   const cookies = await funDetectCookies()
   if (!cookies) return redirect('/')

   const user = await funGetUserByCookies()
   return (
      <>
         <PushProvider user={String(user.id)} />
         <WrapLayout role={user.idUserRole} theme={user.theme} user={user.id} village={user.idVillage}>
            {children}
         </WrapLayout>
      </>
   );
}
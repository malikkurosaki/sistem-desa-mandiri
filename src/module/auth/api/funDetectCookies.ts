'use server'
import { pwd_key_config } from "@/module/_global"
import { unsealData } from "iron-session"
import _ from "lodash"
import { cookies } from "next/headers"

export default async function funDetectCookies() {
   const cookiesnya = cookies()
   const c = cookiesnya.get("sessionCookieSDM")
   if (!c || _.isUndefined(c) || !c.value || _.isEmpty(c.value)) {
      return false
   }
   const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })
   if (_.isEmpty(dataCookies)) {
      return false
   }

   return true
}
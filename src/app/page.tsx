import { pwd_key_config } from "@/module/_global";
import { funDetectCookies, ViewLogin } from "@/module/auth";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookies = await funDetectCookies()
  if (cookies) return redirect('/home')
  return (
    <>
      <ViewLogin />
    </>
  );
}

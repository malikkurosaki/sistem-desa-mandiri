import { funDetectCookies, ViewLogin } from "@/module/auth";
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

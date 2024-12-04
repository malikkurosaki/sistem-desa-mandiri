'use client'
import { useHookstate } from "@hookstate/core";
import { Card, Stack, Text, Title } from "@mantine/core";
import { subState } from "../_lib/state";
import { ButtonSubscribe } from "../_lib/ButtonSubscribe";
import { useSearchParams } from "next/navigation";

export default function Page() {
   const user = useSearchParams().get("user")
   const { value: sub } = useHookstate(subState)
   if (!sub) return <Text>loading ...</Text>
   if (!user) return <Text>masukkan user</Text>
   return <Stack p={"md"} gap={"lg"}>
      <Title>Kirim</Title>
      <Card>
         <Text>
            {JSON.stringify(sub)}
         </Text>
      </Card>
      <ButtonSubscribe user={user} subscription={sub} />
   </Stack>;
}
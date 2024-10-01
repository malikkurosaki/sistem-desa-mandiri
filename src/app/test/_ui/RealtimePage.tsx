'use client'
import { Button, Stack } from '@mantine/core'
import { useShallowEffect } from '@mantine/hooks'
import { useWibuRealtime } from 'wibu-realtime'
export function RealtimePage({ wibuKey }: { wibuKey: string }) {
   const [data, setData] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: wibuKey,
      project: "sdm"
   })
   useShallowEffect(() => {
      if (data) {
         console.log(data)
      }
   }, [data])

   async function onTekan() {
      setData({
         name: Math.random().toString(),
      })
   }
   return (
      <Stack p={"lg"}>
         {JSON.stringify(data)}
         <Button onClick={onTekan}>Tekan</Button>
      </Stack>
   )
}
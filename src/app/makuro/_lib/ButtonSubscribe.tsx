import { Button } from "@mantine/core";
import { useState } from "react";

export function ButtonSubscribe({ user, subscription }: { user: string, subscription?: PushSubscription | null }) {
   const [loading, setLoading] = useState(false)
   async function subscribe() {
      if(!subscription) return alert("no subscription")
      try {
         setLoading(true)
         const res = await fetch('/makuro/api/sub', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, subscription })
         })

         const dataText = await res.text()
         if (!res.ok) {
            alert(dataText)
            throw new Error(dataText)
         }

         console.log(dataText)
         alert("berhasil subscribe")
      } catch (error) {
         console.error(error);

      } finally {
         setLoading(false)
      }
   }
   return <Button disabled={!subscription} onClick={() => subscribe()} loading={loading} variant="outline" radius={"xl"} size={"lg"}>Subscribe</Button>
}
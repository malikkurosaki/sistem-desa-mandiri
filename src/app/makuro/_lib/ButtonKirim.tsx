import { Button } from "@mantine/core";
import { useState } from "react";

export function ButtonKirim() {
   const [loading, setLoading] = useState(false)
   async function onKirim() {
      setLoading(true)
      try {
         const res = await fetch('/makuro/api/kirim', {
            method: 'POST',
         })
   
         const dataText = await res.text()
         if (!res.ok) {
            alert(dataText)
            throw new Error(dataText)
         }
         const dataJson = JSON.parse(dataText)
         console.log(dataJson)
         alert("berhasil kirim")
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }
   return <Button loading={loading} onClick={() => onKirim()} >Kirim</Button>
}
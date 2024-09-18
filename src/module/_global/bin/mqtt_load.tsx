'use client'
import { useEffect } from "react"
import mtqq_client from "./mqtt_client"

export default function MqttLoad() {
   useEffect(() => {
      mtqq_client.on("connect", () => {
         mtqq_client.subscribe("app_SDM")
      })

      mtqq_client.on("message", (topic, message) => {
         const data = JSON.parse(message.toString())
      })
   }, [])
   return <>

   </>
}
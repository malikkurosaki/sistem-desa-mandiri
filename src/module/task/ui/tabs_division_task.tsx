'use client'
import { Box, rem, Tabs } from "@mantine/core";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiProgress3Line } from "react-icons/ri";
import { TbClockPause } from "react-icons/tb";
import ListDivisionTask from "./list_division_task";
import { useRouter, useSearchParams } from "next/navigation";

export default function TabsDivisionTask() {
   const iconStyle = { width: rem(20), height: rem(20) };
   const router = useRouter()
   const searchParams = useSearchParams()
   const status = searchParams.get('status')

   return (
      <Box p={20}>
         <Tabs variant="pills" color='#FF9861' radius="xl" defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}>
            <Tabs.List grow bg={"white"} style={{
               border: `1px solid ${"#EDEDED"}`,
               padding: 5,
               borderRadius: 100
            }}>
               <Tabs.Tab value="0" w={"23%"}
                  leftSection={<TbClockPause style={iconStyle} />}
                  onClick={() => { router.push("?status=0") }}>
                  Segera
               </Tabs.Tab>
               <Tabs.Tab value="1" w={"28%"}
                  leftSection={<RiProgress3Line style={iconStyle} />}
                  onClick={() => { router.push("?status=1") }}>
                  Dikerjakan
               </Tabs.Tab>
               <Tabs.Tab value="2" w={"23%"}
                  leftSection={<IoIosCheckmarkCircleOutline style={iconStyle} />}
                  onClick={() => { router.push("?status=2") }}>
                  Selesai
               </Tabs.Tab>
               <Tabs.Tab value="3" w={"20%"}
                  leftSection={<IoCloseCircleOutline style={iconStyle} />}
                  onClick={() => { router.push("?status=3") }}>
                  Batal
               </Tabs.Tab>
            </Tabs.List>
            <ListDivisionTask />
         </Tabs>
      </Box>
   )
}
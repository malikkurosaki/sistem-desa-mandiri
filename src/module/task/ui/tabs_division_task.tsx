'use client'
import { Box, Button, rem, Tabs } from "@mantine/core";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiProgress3Line } from "react-icons/ri";
import { TbClockPause } from "react-icons/tb";
import ListDivisionTask from "./list_division_task";
import { useRouter, useSearchParams } from "next/navigation";
import { Carousel } from "@mantine/carousel";
import { TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";

export default function TabsDivisionTask() {
   const iconStyle = { width: rem(20), height: rem(20) };
   const router = useRouter()
   const searchParams = useSearchParams()
   const status = searchParams.get('status')
   const tema = useHookstate(TEMA)

   const dataStatus = [
      {
         id: "0",
         title: "Segera",
         icon: <TbClockPause style={iconStyle} />
      },
      {
         id: "1",
         title: "Dikerjakan",
         icon: <RiProgress3Line style={iconStyle} />
      },
      {
         id: "2",
         title: "Selesai",
         icon: <IoIosCheckmarkCircleOutline style={iconStyle} />
      },
      {
         id: "3",
         title: "Batal",
         icon: <IoCloseCircleOutline style={iconStyle} />
      }
   ]

   return (
      <Box p={20}>
         {/* <Tabs variant="pills" color='#FF9861' radius="xl" defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}>
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
         </Tabs> */}
         <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
            {dataStatus.map((item, index) => (
               <Carousel.Slide key={index}>
                  <Button
                     variant="subtle"
                     color={
                        status == item.id
                           ? "white"
                           : (status == null && item.id == "0") ? "white" : tema.get().utama
                     }
                     onClick={() => { router.push("?status=" + item.id) }}
                     defaultValue={(status == "1" || status == "2" || status == "3") ? status : "0"}
                     radius={"xl"}
                     bg={
                        status == item.id
                           ? tema.get().bgFiturDivisi
                           : (status == null && item.id == "0") ? tema.get().bgFiturDivisi : "transparent"
                     }
                  >
                     {item.icon}
                     <Box ml={10}>{item.title}</Box>
                  </Button>
               </Carousel.Slide>
            ))}
         </Carousel>
         <ListDivisionTask />
      </Box>
   )
}
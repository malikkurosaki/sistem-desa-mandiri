'use client'
import { Box, Button, Flex, rem, Tabs } from "@mantine/core";
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
         <Box
          style={{
            display: "flex",
            gap: "20px",
            position: "relative",
            overflowX: "scroll",
            scrollbarWidth: "none",
            maxWidth: "550px"
          }}
        >
          <Flex gap={"md"} justify={"space-between"}>
            {dataStatus.map((item, index) => (
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
                  key={index}
              bg={
                 status == item.id
                    ? tema.get().bgFiturDivision
                    : (status == null && item.id == "0") ? tema.get().bgFiturDivision : "transparent"
              }
              leftSection={item.icon}
           >
                {item.title}
              </Button>
            ))}
          </Flex>
        </Box>
         <ListDivisionTask />
      </Box>
   )
}
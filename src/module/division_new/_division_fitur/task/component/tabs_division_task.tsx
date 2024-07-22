'use client'
import { Box, rem, Tabs } from "@mantine/core";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiProgress3Line } from "react-icons/ri";
import { TbClockPause } from "react-icons/tb";
import ListDivisionTask from "./list_division_task";

export default function TabsDivisionTask() {
   const iconStyle = { width: rem(20), height: rem(20) };

   return (
      <Box p={20}>
         <Tabs variant="pills" color='#FF9861' radius="xl" defaultValue="segera">
            <Tabs.List grow bg={"white"} style={{
               border: `1px solid ${"#EDEDED"}`,
               padding: 5,
               borderRadius: 100
            }}>
               <Tabs.Tab value="segera" w={"23%"} leftSection={<TbClockPause style={iconStyle} />}>
                  Segera
               </Tabs.Tab>
               <Tabs.Tab value="dikerjakan"  w={"28%"} leftSection={<RiProgress3Line style={iconStyle} />}>
                  Dikerjakan
               </Tabs.Tab>
               <Tabs.Tab value="selesai"  w={"23%"} leftSection={<IoIosCheckmarkCircleOutline style={iconStyle} />}>
                  Selesai
               </Tabs.Tab>
               <Tabs.Tab value="batal"  w={"20%"} leftSection={<IoCloseCircleOutline style={iconStyle} />}>
                  Batal
               </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="segera">
               <ListDivisionTask status="segera" />
            </Tabs.Panel>

            <Tabs.Panel value="dikerjakan">
               <ListDivisionTask status="dikerjakan" />
            </Tabs.Panel>

            <Tabs.Panel value="selesai">
               <ListDivisionTask status="selesai" />
            </Tabs.Panel>

            <Tabs.Panel value="batal">
               <ListDivisionTask status="batal" />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}
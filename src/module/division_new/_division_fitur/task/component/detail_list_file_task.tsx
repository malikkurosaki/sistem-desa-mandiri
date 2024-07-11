import { WARNA } from "@/module/_global";
import { Box, Group, Text } from "@mantine/core";
import { BsFiletypeCsv } from "react-icons/bs";

export default function ListFileDetailTask() {
   return (
      <Box pt={20}>
         <Text fw={'bold'} c={WARNA.biruTua}>File</Text>
         <Box bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 20
         }}>
            <Box style={{
               borderRadius: 10,
               border: `1px solid ${"#D6D8F6"}`,
               padding: 10
            }} mb={10}>
               <Group>
                  <BsFiletypeCsv size={25} />
                  <Text>Proyek Laporan Permasyarakatan</Text>
               </Group>
            </Box>
            <Box style={{
               borderRadius: 10,
               border: `1px solid ${"#D6D8F6"}`,
               padding: 10
            }}>
               <Group>
                  <BsFiletypeCsv size={25} />
                  <Text>Proyek Laporan Permasyarakatan</Text>
               </Group>
            </Box>
         </Box>
      </Box>
   )
}
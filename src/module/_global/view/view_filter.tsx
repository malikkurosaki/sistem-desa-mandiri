'use client'
import { Box, Group, Divider, Button, Text } from "@mantine/core";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { WARNA } from "../fun/WARNA";
import LayoutNavbarNew from "../layout/layout_navbar_new";
import { useRouter } from "next/navigation";

const dataFilter = [
   {
      id: 1,
      name: 'Dinas'
   },
   {
      id: 2,
      name: 'Adat'
   },
   {
      id: 3,
      name: 'LPD'
   },
   {
      id: 4,
      name: 'Karang Taruna'
   },
   {
      id: 5,
      name: 'BPD'
   },
   {
      id: 6,
      name: 'LPM'
   },
]
export default function ViewFilter() {
   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

   const handleFilterClick = (filterName: string) => {
      setSelectedFilter(filterName);
   };

   const router = useRouter()

   return (
      <Box>
         <LayoutNavbarNew back='' title='Filter' menu />
         <Box p={20}>
            {dataFilter.map((filter) => (
               <Box key={filter.id}>
                  <Group
                     justify="space-between"
                     align="center"
                     mb={10}
                     onClick={() => handleFilterClick(filter.name)}
                  >
                     <Text fw={selectedFilter === filter.name ? 'bold' : 'normal'}>
                        {filter.name}
                     </Text>
                     {selectedFilter === filter.name && <FaCheck size={25} />}
                  </Group>
                  <Divider my={"sm"} />
               </Box>
            ))}
            <Button
               fullWidth
               radius={100}
               size="lg"
               color={WARNA.biruTua}
               onClick={() => { router.back() }}
            >
               Terapkan
            </Button>
         </Box>
      </Box>
   );
}
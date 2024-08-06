'use client'
import { Box, Group, Divider, Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { WARNA } from "../fun/WARNA";
import LayoutNavbarNew from "../layout/layout_navbar_new";
import { useRouter } from "next/navigation";
import { API_ADDRESS } from "../bin/api_address";
import { useShallowEffect } from "@mantine/hooks";

interface dataGroup {
   id: string;
   name: string;
}

export default function ViewFilter({linkFilter}: {linkFilter: string}) {
   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
   const [checked, setChecked] = useState<dataGroup[]>([]);
   const [searchParams, setSearchParams] = useState({ groupId: '' });

   const handleFilterClick = (id: string) => {
     setSelectedFilter(id);
   };
   
   async function getAllGroupFilter() {
     try {
       const response = await fetch(`${API_ADDRESS.apiGetAllGroup}&active=true&groupId=${searchParams.groupId}`);
       const data = await response.json();
       console.log("mana data", response);
       setChecked(data);
     } catch (error) {
       console.error(error);
     }
   }
   
   useEffect(() => {
     if (selectedFilter) {
       setSearchParams({ groupId: selectedFilter });
     }
   }, [selectedFilter]);
   
   useEffect(() => {
     getAllGroupFilter();
   }, [searchParams.groupId]);

   const router = useRouter()

   return (
      <Box>
         <LayoutNavbarNew back='' title='Filter' menu />
         <Box p={20}>
            {checked.map((filter) => (
               <Box key={filter.id}>
                  <Group
                     justify="space-between"
                     align="center"
                     mb={10}
                     onClick={() => handleFilterClick(filter.id)}
                  >
                     <Text fw={selectedFilter === filter.id ? 'bold' : 'normal'}>
                        {filter.name}
                     </Text>
                     {selectedFilter === filter.id && <FaCheck size={25} />}
                  </Group>
                  <Divider my={"sm"} />
               </Box>
            ))}
            <Button
               fullWidth
               radius={100}
               size="lg"
               color={WARNA.biruTua}
               onClick={() => {
                  router.push(`/${linkFilter}?group=` + selectedFilter)
               }}
            >
               Terapkan
            </Button>
         </Box>
      </Box>
   );
}
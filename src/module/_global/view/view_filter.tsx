'use client'
import { Box, Group, Divider, Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { WARNA } from "../fun/WARNA";
import LayoutNavbarNew from "../layout/layout_navbar_new";
import { useRouter } from "next/navigation";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { useShallowEffect } from "@mantine/hooks";
import toast from "react-hot-toast";

export default function ViewFilter({ linkFilter }: { linkFilter: string }) {
   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
   const [checked, setChecked] = useState<IDataGroup[]>([]);
   const [searchParams, setSearchParams] = useState({ groupId: '' });

   const handleFilterClick = (id: string) => {
      setSelectedFilter(id);
   };

   async function getAllGroupFilter() {
      try {
         const response = await funGetAllGroup('?active=true')
         if (response.success) {
            setChecked(response.data);
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan grup, coba lagi nanti");
      }
   }

   useEffect(() => {
      if (selectedFilter) {
         setSearchParams({ groupId: selectedFilter });
      }
   }, [selectedFilter]);

   useShallowEffect(() => {
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
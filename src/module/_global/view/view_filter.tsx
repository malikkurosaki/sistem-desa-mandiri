'use client'
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { useHookstate } from "@hookstate/core";
import { Box, Button, Divider, Group, rem, Skeleton, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { TEMA } from "../bin/val_global";
import LayoutNavbarNew from "../layout/layout_navbar_new";
import { funGetUserByCookies } from "@/module/auth";

export default function ViewFilter({ linkFilter }: { linkFilter: string }) {
   const [selectedFilter, setSelectedFilter] = useState<any>('');
   const [checked, setChecked] = useState<IDataGroup[]>([]);
   const [loading, setLoading] = useState(true)
   const searchParams = useSearchParams()
   const group = searchParams.get('group')
   const tema = useHookstate(TEMA)


   async function getAllGroupFilter() {
      try {
         setLoading(true)
         const response = await funGetAllGroup('?active=true')
         if (response.success) {
            setChecked(response.data);
            setLoading(false)
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan grup, coba lagi nanti");
      } finally {
         setLoading(false);
      }
   }

   async function dataUser() {
      const user = await funGetUserByCookies()
      setSelectedFilter(user.idGroup)
   }

   useShallowEffect(() => {
      if (group == "null" || group == "undefined" || group == '') {
         dataUser()
      } else {
         setSelectedFilter(group)
      }
   }, [group]);


   useShallowEffect(() => {
      getAllGroupFilter();
   }, []);

   const router = useRouter()

   return (
      <Box>
         <LayoutNavbarNew back='' title='Filter' menu />
         <Box p={20}>
            {loading ? (
               Array(5)
                  .fill(null)
                  .map((_, i) => (
                     <Box key={i}>
                        <Box>
                           <Skeleton width={"100%"} mb={15} height={30} radius={"md"} />
                        </Box>
                     </Box>
                  ))
            ) :
               (
                  checked.map((filter) => (
                     <Box key={filter.id}>
                        <Group
                           justify="space-between"
                           align="center"
                           mb={10}
                           onClick={() => setSelectedFilter(filter.id)}
                        >
                           <Text fw={selectedFilter === filter.id ? 'bold' : 'normal'}>
                              {filter.name}
                           </Text>
                           {selectedFilter === filter.id && <FaCheck size={25} />}
                        </Group>
                        <Divider my={"sm"} />
                     </Box>
                  ))
               )
            }
         </Box>
         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`,
         }}>
            <Button
               fullWidth
               radius={100}
               size="lg"
               color={tema.get().utama}
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
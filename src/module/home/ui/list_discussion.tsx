'use client'
import { WARNA } from "@/module/_global";
import { Box, Grid, Group, SimpleGrid, Skeleton, Text } from "@mantine/core";
import { GoDiscussionClosed } from "react-icons/go";
import { CiClock2, CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IDataHomeDiskusi } from "../lib/type_home";
import { funGetHome } from "../lib/api_home";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";


export default function ListDiscussion() {
   const router = useRouter()
   const [isData, setData] = useState<IDataHomeDiskusi[]>([])
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      try {
         setData([]);
         setLoading(true);
         const response = await funGetHome('?cat=discussion')

         if (response.success) {
            setData(response.data)
         } else {
            toast.error(response.message);
         }
         setLoading(false);
      } catch (error) {
         toast.error("Gagal mendapatkan data, coba lagi nanti");
         console.error(error);
      } finally {
         setLoading(false);
      }
   };


   useShallowEffect(() => {
      fetchData();
   }, []);

   return (
      <Box pt={10}>
         <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Diskusi</Text>
         <Box bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 10
         }}>

            {
               loading ?
                  Array(3)
                     .fill(null)
                     .map((_, i) => (
                        <Box key={i} mb={10}>
                           <Skeleton height={100} width={"100%"} radius={"md"} />
                        </Box>
                     ))
                  :
                  _.isEmpty(isData)
                     ?
                     <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada diskusi</Text>
                     </Box>
                     :
                     <>
                        {
                           isData.map((v, i) => {
                              return (
                                 <Box key={i} p={10}>
                                 <Box  style={{
                                    borderRadius: 10,
                                    border: `1px solid ${"#D6D8F6"}`,
                                    padding: 10
                                 }}  onClick={() => router.push(`/division/${v.idDivision}/discussion/${v.id}`)}>
                                    <Group>
                                       <GoDiscussionClosed size={25} />
                                       <Box w={{ base: 230, md: 400 }}>
                                          <Text fw={"bold"} truncate="end">
                                             {v.desc}
                                          </Text>
                                       </Box>
                                    </Group>
                                    <Grid align="center" mt={20}>
                                          <Grid.Col span={{
                                             base: 7,
                                             xl: 9
                                       }}>
                                          <Group gap={5} align="center">
                                             <CiUser size={18} />
                                             <Box w={{
                                                base: 125,
                                                xl: 300
                                             }}>
                                                <Text fz={13} lineClamp={1}>
                                                {v.user}
                                                </Text>
                                             </Box>
                                          </Group>
                                       </Grid.Col>
                                          <Grid.Col span={{
                                             base: 5,
                                             xl: 3
                                       }}>
                                          <Group gap={5} align="center" justify="flex-end">
                                             <CiClock2 size={18} />
                                             <Text fz={13}>{v.date}</Text>
                                          </Group>
                                       </Grid.Col>
                                    </Grid>
                                 </Box>
                                 </Box>
                              )
                           })
                        }
                     </>

            }
         </Box>
      </Box>
   )
}
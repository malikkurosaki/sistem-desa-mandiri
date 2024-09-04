'use client'
import { WARNA } from "@/module/_global"
import { Box, Divider, Flex, Group, Skeleton, Text } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IDataHomeEvent } from "../lib/type_home"
import { funGetHome } from "../lib/api_home"
import toast from "react-hot-toast"
import { useShallowEffect } from "@mantine/hooks"
import _ from "lodash"


export default function ListEventHome() {
   const router = useRouter()
   const [isData, setData] = useState<IDataHomeEvent[]>([])
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      try {
         setData([]);
         setLoading(true);
         const response = await funGetHome('?cat=event')

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
         <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Event Hari Ini</Text>
         <Box bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 10
         }}>
            {loading ?
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
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                     <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada event</Text>
                  </Box>
                  :
                  isData.map((event, index) => {
                     const bgColor = ['#D8D8F1', '#FED6C5'][index % 2]
                     const colorDivider = ['#535FCA', '#A7A7A7'][index % 2]
                     return (
                        <Box key={event.id} mt={10}>
                           <Box onClick={() => router.push(`/division/${event.idDivision}/calender/${event.id}`)}  bg={bgColor} pl={15} p={10} style={{
                              borderRadius: 10
                           }} h={113}>
                              <Group>
                                 <Divider h={92} size="lg" orientation="vertical" color={colorDivider} />
                                 <Flex direction={'column'}>
                                    <Text>{event.timeStart} - {event.timeEnd}</Text>
                                    <Box w={{
                                       base: 260,
                                       xl: 430
                                    }}>
                                       <Text fw={"bold"} lineClamp={1}>
                                          {_.startCase(event.title)}
                                       </Text>
                                    </Box>
                                    <Box w={{
                                       base: 260,
                                       xl: 420
                                    }}>
                                       <Text lineClamp={1}>
                                          Dibuat oleh : {event.user_name}
                                       </Text>
                                    </Box>
                                 </Flex>
                              </Group>
                           </Box>
                        </Box>
                     )
                  })
            }
         </Box>
      </Box>
   )
}
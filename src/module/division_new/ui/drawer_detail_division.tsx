"use client"
import { TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, Stack, SimpleGrid, Flex, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { BsInfoCircle } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";

export default function DrawerDetailDivision() {
   const param = useParams<{ id: string }>()
   const router = useRouter()
   const tema = useHookstate(TEMA)

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 2, sm: 2, lg: 3 }}
            >
               <Flex onClick={() => router.push('/division/info/' + param.id)} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <BsInfoCircle size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama}>Informasi Divisi</Text>
                  </Box>
               </Flex>
               <Flex onClick={() => {
                  router.push('/division/report/' + param.id)
               }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <TbReportAnalytics size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama}>Report Divisi</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
      </Box>
   );
}
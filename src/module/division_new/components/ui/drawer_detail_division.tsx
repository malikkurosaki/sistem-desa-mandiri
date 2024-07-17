import { WARNA } from "@/module/_global";
import { Box, Stack, SimpleGrid, Flex, Text } from "@mantine/core";
import router from "next/router";
import { BsInfoCircle } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";

export default function DrawerDetailDivision() {
   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
            >
               <Flex onClick={() => router.push('/division/info/1')} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <BsInfoCircle size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Informasi Divisi</Text>
                  </Box>
               </Flex>
               <Flex onClick={() => {
                  router.push('/division/edit/1')
               }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <FaPencil size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Edit Divisi</Text>
                  </Box>
               </Flex>
               <Flex onClick={() => {
                  router.push('/division/edit-anggota/1')
               }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <TbReportAnalytics size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Edit Anggota</Text>
                  </Box>
               </Flex>
               <Flex onClick={() => {
                  router.push('/division/report/1')
               }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <TbReportAnalytics size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Report Divisi</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
      </Box>
   );
}
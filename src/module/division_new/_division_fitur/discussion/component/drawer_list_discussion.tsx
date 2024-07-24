import { WARNA } from "@/module/_global";
import { Box, Stack, SimpleGrid, Flex, Text } from "@mantine/core";
import { IoAddCircle } from "react-icons/io5";

export default function DrawerListDiscussion() {
   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 2, sm: 2, lg: 3 }}
            >
               <Flex onClick={() => window.location.href = "/discussion/create"} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <IoAddCircle size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Tambah Diskusi</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
      </Box>
   )
}
import { TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, Stack, SimpleGrid, Flex, Text } from "@mantine/core";
import { IoAddCircle } from "react-icons/io5";

export default function DrawerDivisionTask() {
   const tema = useHookstate(TEMA)
   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 2, sm: 3, lg: 3 }}
            >
               <Flex onClick={() => window.location.href = "task/create"} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <IoAddCircle size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama}>Tambah Tugas</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
      </Box>
   )
}
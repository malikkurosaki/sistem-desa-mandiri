import { isDrawer, WARNA, LayoutDrawer } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, Stack, SimpleGrid, Flex, TextInput, Button, Text, Select } from "@mantine/core";
import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";

export default function DrawerListPosition() {
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const openDrawer = useHookstate(isDrawer)

   function onCLose() {
      setOpenDrawerGroup(false)
      openDrawer.set(false)
   }
   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
               onClick={() => setOpenDrawerGroup(true)}
            >
               <Flex justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <IoAddCircle size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text ta={'center'} c={WARNA.biruTua}>Tambah Jabatan</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
         <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Tambah Jabatan'} size="lg">
            <Box pt={0}>
               <Select
                  label="Grup"
                  placeholder="Pilih grup"
                  data={['Dinas', 'Adat', 'LPD']}
                  size="md"
                  radius={10}
                  mb={5}
                  withAsterisk
                  styles={{
                     input: {
                        color: WARNA.biruTua,
                        borderRadius: WARNA.biruTua,
                        borderColor: WARNA.biruTua,
                     },
                  }}
               />
               <TextInput
                  label="Jabatan"
                  styles={{
                     input: {
                        color: WARNA.biruTua,
                        borderRadius: WARNA.biruTua,
                        borderColor: WARNA.biruTua,
                     },
                  }}
                  my={15}
                  size="md"
                  radius={10}
                  placeholder="Nama Jabatan"
               />
               <Box mt={'xl'}>
                  <Button
                     c={"white"}
                     bg={WARNA.biruTua}
                     size="lg"
                     radius={30}
                     fullWidth
                     onClick={onCLose}
                  >
                     MASUK
                  </Button>
               </Box>
            </Box>
         </LayoutDrawer>
      </Box>
   );
}
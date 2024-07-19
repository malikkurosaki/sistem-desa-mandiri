import { LayoutDrawer, WARNA } from "@/module/_global"
import LayoutModal from "@/module/_global/layout/layout_modal"
import { Box, Stack, SimpleGrid, Flex, Text, Select, TextInput, Button } from "@mantine/core"
import { useState } from "react"
import { FaPencil, FaToggleOff } from "react-icons/fa6"

export default function DrawerDetailPosition({ onUpdated }: { onUpdated: (val: boolean) => void }) {
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const [isModal, setModal] = useState(false)

   function onCLose() {
      onUpdated(true)
      setOpenDrawerGroup(false)
   }

   function onTrue(val: boolean) {
      if (val) {
         onUpdated(true)
      }
      setModal(false)
   }

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
            >
               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setModal(true)}
               >
                  <Box>
                     <FaToggleOff size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Non Aktifkan</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenDrawerGroup(true)}
               >
                  <Box>
                     <FaPencil size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Edit</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>

         <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Edit Jabatan'} size="lg">
            <Box pt={10}>
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
                     EDIT
                  </Button>
               </Box>
            </Box>
         </LayoutDrawer>


         <LayoutModal opened={isModal} onClose={() => setModal(false)}
            description="Apakah Anda yakin ingin mengubah status aktifasi data?"
            onYes={(val) => { onTrue(val) }} />
      </Box>
   )
}
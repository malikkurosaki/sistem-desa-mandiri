import { WARNA, LayoutDrawer } from "@/module/_global";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { Box, Stack, SimpleGrid, Flex, TextInput, Button, Text, Select } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";
import { funCreatePosition } from "../lib/api_position";


export default function DrawerListPosition({ onCreated }: { onCreated: (val: boolean) => void }) {
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const router = useRouter()
   const [listGroup, setListGorup] = useState<IDataGroup[]>([])
   const [touched, setTouched] = useState({
      name: false,
      idGroup: false
    });

   const [listData, setListData] = useState({
      name: "",
      idGroup: "",
   })

   async function getAllGroup() {
      try {
         const response = await funGetAllGroup('?active=true')
         if (response.success) {
            setListGorup(response.data);
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan jabatan, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getAllGroup()
   }, [])


   async function onSubmit() {
      try {
         const res = await funCreatePosition({
            name: listData.name,
            idGroup: listData.idGroup
         })

         if (res.success) {
            setOpenDrawerGroup(false)
            toast.success(res.message)
            onCreated(true)
         } else {
            toast.error(res.message)
         }

      } catch (error) {
         toast.error('Error')
      }
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
               <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => router.push('/position?page=filter')}>
                  <Box>
                     <RiFilter2Line size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text ta={'center'} c={WARNA.biruTua}>Filter</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
         <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Tambah Jabatan'} size="lg">
            <Box pt={0}>
               <Select
                  label="Grup"
                  placeholder="Pilih grup"
                  data={
                     listGroup
                        ? listGroup.map((data) => ({
                           value: data.id,
                           label: data.name,
                        }))
                        : []
                  }
                  size="md"
                  radius={10}
                  mb={5}
                  withAsterisk
                  onChange={(val: any) => {
                     setListData({
                        ...listData,
                        idGroup: val
                     })
                     setTouched({ ...touched, idGroup: false })
                  }}
                  styles={{
                     input: {
                        color: WARNA.biruTua,
                        borderRadius: WARNA.biruTua,
                        borderColor: WARNA.biruTua,
                     },
                  }}
                  error={
                     touched.idGroup && (
                      listData.idGroup == "" ? "Grup Tidak Boleh Kosong" : null
                     )
                   }
                  onFocus={() => setTouched({ ...touched, idGroup: true })}
                  onBlur={() => setTouched({ ...touched, idGroup: true })}
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
                  onChange={(event: any) => {
                     setListData({
                        ...listData,
                        name: event.target.value
                     })
                     setTouched({ ...touched, name: false })
                  }}
                  radius={10}
                  placeholder="Nama Jabatan"
                  error={
                     touched.name && (
                      listData.name == "" ? "Nama Jabatan Tidak Boleh Kosong" : null
                     )
                   }
                  onFocus={() => setTouched({ ...touched, name: true })}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  required
               />
               <Box mt={'xl'}>
                  <Button
                     c={"white"}
                     bg={WARNA.biruTua}
                     size="lg"
                     radius={30}
                     fullWidth
                     onClick={onSubmit}
                  >
                     MASUK
                  </Button>
               </Box>
            </Box>
         </LayoutDrawer>
      </Box>
   );
}
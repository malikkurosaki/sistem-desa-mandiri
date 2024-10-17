import { WARNA, LayoutDrawer, globalRole, TEMA } from "@/module/_global";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { Box, Stack, SimpleGrid, Flex, TextInput, Button, Text, Select } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";
import { funCreatePosition } from "../lib/api_position";
import { useHookstate } from "@hookstate/core";
import { globalRefreshPosition } from "../lib/val_posisition";


export default function DrawerListPosition({ onCreated }: { onCreated: (val: boolean) => void }) {
   const roleLogin = useHookstate(globalRole)
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const router = useRouter()
   const [listGroup, setListGorup] = useState<IDataGroup[]>([])
   const refresh = useHookstate(globalRefreshPosition)
   const searchParams = useSearchParams()
   const group = searchParams.get('group')
   const tema = useHookstate(TEMA)
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
   }, [refresh.get()])


   async function onSubmit() {
      try {
         const res = await funCreatePosition({
            name: listData.name,
            idGroup: listData.idGroup
         })

         if (res.success) {
            setOpenDrawerGroup(false)
            toast.success(res.message)
            refresh.set(!refresh.get())
            onCreated(true)
         } else {
            toast.error(res.message)
            setOpenDrawerGroup(false)
            onCreated(true)
         }

      } catch (error) {
         toast.error('Error')
      }
   }

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 2, sm: 3, lg: 3 }}
               onClick={() => setOpenDrawerGroup(true)}
            >
               <Flex justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <IoAddCircle size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text ta={'center'} c={tema.get().utama}>Tambah Jabatan</Text>
                  </Box>
               </Flex>
               {
                  roleLogin.get() == "supadmin" &&
                  <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => router.push('/position?page=filter&group=' + group)}>
                     <Box>
                        <RiFilter2Line size={30} color={tema.get().utama} />
                     </Box>
                     <Box>
                        <Text ta={'center'} c={tema.get().utama}>Filter</Text>
                     </Box>
                  </Flex>
               }
            </SimpleGrid>
         </Stack>
         <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Tambah Jabatan'} size="lg">
            <Box pt={10} pos={"relative"} h={"70vh"}>
               {
                  roleLogin.get() == "supadmin" &&
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
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
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
               }
               <TextInput
                  label="Jabatan"
                  styles={{
                     input: {
                        color: tema.get().utama,
                        borderRadius: tema.get().utama,
                        borderColor: tema.get().utama,
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
               <Box pos={"absolute"} bottom={10} left={0} right={0}>
                  <Button
                     c={"white"}
                     bg={tema.get().utama}
                     size="lg"
                     radius={30}
                     fullWidth
                     onClick={onSubmit}
                  >
                     SIMPAN
                  </Button>
               </Box>
            </Box>
         </LayoutDrawer>
      </Box>
   );
}
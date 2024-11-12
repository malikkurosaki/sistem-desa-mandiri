import { globalRole, keyWibu, LayoutDrawer, TEMA } from "@/module/_global";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { useHookstate } from "@hookstate/core";
import { Box, Button, Flex, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";
import { useWibuRealtime } from "wibu-realtime";
import { funCreatePosition } from "../lib/api_position";
import { globalRefreshPosition } from "../lib/val_posisition";


export default function DrawerListPosition({ onCreated }: { onCreated: (val: boolean) => void }) {
   const roleLogin = useHookstate(globalRole)
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const [loadingSave, setLoadingSave] = useState(false)
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
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
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
         setLoadingSave(true)
         const res = await funCreatePosition({
            name: listData.name,
            idGroup: listData.idGroup
         })

         if (res.success) {
            toast.success(res.message)
            setDataRealtime([{
               category: "data-position",
               group: res.positions.idGroup,
            }])
            refresh.set(!refresh.get())
            onCreated(true)
            setOpenDrawerGroup(false)
         } else {
            toast.error(res.message)
            setOpenDrawerGroup(false)
            onCreated(true)
         }

      } catch (error) {
         toast.error('Error')
      } finally {
         setLoadingSave(false)
      }
   }

   function onCheck() {
      const check = checkAll()
      if (!check)
         return false
      onSubmit()
   }

   function checkAll() {
      let nilai = true
      if (listData.name == "" || listData.name.length < 3) {
         setTouched(touched => ({ ...touched, name: true }))
         nilai = false
      }

      if (roleLogin.get() == "supadmin" && (listData.idGroup == "" || String(listData.idGroup) == "null")) {
         setTouched(touched => ({ ...touched, idGroup: true }))
         nilai = false
      }

      return nilai
   }

   function onValidation(kategori: string, val: string) {
      if (kategori == 'name') {
         setListData({ ...listData, name: val })
         if (val == "" || val.length < 3) {
            setTouched({ ...touched, name: true })
         } else {
            setTouched({ ...touched, name: false })
         }
      } else if (kategori == 'idGroup') {
         setListData({ ...listData, idGroup: val })
         if (val == "" || String(val) == "null") {
            setTouched({ ...touched, idGroup: true })
         } else {
            setTouched({ ...touched, idGroup: false })
         }
      }
   }

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 2, sm: 3, lg: 3 }}
            >
               <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => setOpenDrawerGroup(true)}>
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
         <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Tambah Jabatan'} size="md">
            <Box pos={"relative"} h={"35vh"}>
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
                     mb={15}
                     withAsterisk
                     onChange={(e: any) => { onValidation('idGroup', e) }}
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
                        },
                     }}
                     error={
                        touched.idGroup && (
                           listData.idGroup == "" || String(listData.idGroup) == "null" ? "Grup Tidak Boleh Kosong" : null
                        )
                     }
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
                  mb={15}
                  size="md"
                  onChange={(e) => { onValidation('name', e.target.value) }}
                  radius={10}
                  placeholder="Nama Jabatan"
                  error={
                     touched.name &&
                     (listData.name == "" ? "Nama Jabatan Tidak Boleh Kosong" :
                        listData.name.length < 3 ? "Masukkan Minimal 3 karakter" : ""
                     )
                  }
                  required
               />
               <Box pos={"absolute"} bottom={0} left={0} right={0}>
                  <Button
                     c={"white"}
                     bg={tema.get().utama}
                     size="lg"
                     radius={30}
                     fullWidth
                     onClick={() => { onCheck() }}
                     loading={loadingSave}
                  >
                     SIMPAN
                  </Button>
               </Box>
            </Box>
         </LayoutDrawer>
      </Box>
   );
}
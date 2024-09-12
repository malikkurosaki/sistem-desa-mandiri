import { LayoutDrawer, TEMA, WARNA } from "@/module/_global"
import LayoutModal from "@/module/_global/layout/layout_modal"
import { funGetAllGroup, IDataGroup } from "@/module/group"
import { Box, Stack, SimpleGrid, Flex, Text, Select, TextInput, Button, Skeleton } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaPencil, FaToggleOff } from "react-icons/fa6"
import { funEditPosition, funEditStatusPosition, funGetOnePosition } from "../lib/api_position"
import { IDataPosition } from "../lib/type_position"
import { useHookstate } from "@hookstate/core"
import { globalRefreshPosition } from "../lib/val_posisition"

export default function DrawerDetailPosition({ onUpdated, id, isActive }: {
   onUpdated: (val: boolean) => void, id: string, isActive: boolean;
}) {
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const [isModal, setModal] = useState(false)
   const refresh = useHookstate(globalRefreshPosition)
   const [loading, setLoading] = useState(true)
   const tema = useHookstate(TEMA)
   const [data, setData] = useState<any>({
      id: id,
      name: "",
      idGroup: ""
   })
   const [listGroup, setListGorup] = useState<IDataPosition[]>([])
   const [touched, setTouched] = useState({
      name: false,
      idGroup: false
   });

   function onCLose() {
      onUpdated(true)
      setOpenDrawerGroup(false)
   }

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
         toast.error("Gagal mendapatkan grup, coba lagi nanti");
      }
   }

   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetOnePosition(id)
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message)
         }
         setLoading(false)
      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan jabatan, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }


   async function onSubmit() {
      try {
         const res = await funEditPosition(id, {
            name: data.name,
            idGroup: data.idGroup
         })

         if (res.success) {
            toast.success(res.message);
            refresh.set(!refresh.get())
            onUpdated(true);
            onCLose();
         } else {
            onUpdated(false);
            toast.error(res.message)
         }

      } catch (error) {
         toast.error('Error');
         toast.error("Edit jabatan gagal, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getAllGroup()
      getOneData()
   }, [refresh.get()])

   async function nonActive(val: boolean) {
      try {
         if (val) {
            const res = await funEditStatusPosition(id, { isActive: isActive })
            if (res.success) {
               toast.success(res.message);
               refresh.set(!refresh.get())
               onUpdated(true);
            } else {
               onUpdated(false);
               toast.error(res.message)
            }
         }
         setModal(false);
      } catch (error) {
         console.error(error);
         setModal(false);
         toast.error("Edit jabatan gagal, coba lagi nanti");
         onUpdated(false);
      }
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
                     <FaToggleOff size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama}>{isActive == false ? "Aktifkan" : "Non Aktifkan"}</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenDrawerGroup(true)}
               >
                  <Box>
                     <FaPencil size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama} ta='center'>Edit</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>

         <LayoutDrawer opened={openDrawerGroup} onClose={() => setOpenDrawerGroup(false)} title={'Edit Jabatan'} >
            <Box pt={10} pos={"relative"} h={"28.5vh"}>
               {loading ?
                  <Box>
                     <Skeleton height={40} mt={6} radius={10} />
                     <Skeleton height={40} mt={15} radius={10} />
                  </Box>
                  :
                  <Box>
                     <TextInput
                        label="Jabatan"
                        styles={{
                           input: {
                              color: tema.get().utama,
                              borderRadius: tema.get().utama,
                              borderColor: tema.get().utama,
                           },
                        }}
                        required
                        size="md"
                        value={String(data.name)}
                        onChange={(e) => {
                           setData({ ...data, name: e.target.value })
                           setTouched({ ...touched, name: false })
                        }}
                        onBlur={() => setTouched({ ...touched, name: true })}
                        error={
                           touched.name && (
                              data.name == "" ? "Nama Jabatan Tidak Boleh Kosong" : null
                           )
                        }
                        radius={10}
                        placeholder="Nama Jabatan"
                     />
                  </Box>
               }
               <Box pos={"absolute"} bottom={10} left={0} right={0}>
                  <Button
                     c={"white"}
                     bg={tema.get().utama}
                     size="lg"
                     radius={30}
                     fullWidth
                     onClick={onSubmit}
                  >
                     EDIT
                  </Button>
               </Box>
            </Box>
         </LayoutDrawer>


         <LayoutModal opened={isModal} onClose={() => setModal(false)}
            description="Apakah Anda yakin ingin mengubah status aktifasi data?"
            onYes={(val) => { nonActive(val) }} />
      </Box>
   )
}
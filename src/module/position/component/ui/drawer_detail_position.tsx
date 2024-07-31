import { API_ADDRESS, LayoutDrawer, WARNA } from "@/module/_global"
import LayoutModal from "@/module/_global/layout/layout_modal"
import { Box, Stack, SimpleGrid, Flex, Text, Select, TextInput, Button } from "@mantine/core"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaPencil, FaToggleOff } from "react-icons/fa6"

type dataGroup = {
   id: string;
   name: string;
   idGroup: string
};

export default function DrawerDetailPosition({ onUpdated, id }: {
   onUpdated: (val: boolean) => void, id: string | null,
}) {
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const [isModal, setModal] = useState(false)
   const [data, setData] = useState<any>({
      id: id,
      name: "",
      idGroup: ""
   })
   const [listGroup, setListGorup] = useState<dataGroup[]>([])

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
   async function getAllGroup() {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetAllGroup}&villageId=121212&active=true`)
         const data = await res.json()
         setListGorup(data)
      } catch (error) {
         console.error(error)
      }
   }

   async function getOneData() {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetOnePosition}&positionId=${id}`)
         const data = await res.json()
         setData(data)
      } catch (error) {
         console.error(error)
      }
   }


   async function onSubmit() {
      try {
         const res = await fetch(API_ADDRESS.apiUpdatePosition, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               id: data.id,
               name: data.name,
               idGroup: data.idGroup
            }),
         })

         const respon = await res.json()

         if (res.status == 200) {
            toast.success(respon.message)
         } else {
            toast.error(respon.message)
         }

         onUpdated(true)
         onCLose();
      } catch (error) {
         toast.error('Error');
      }
   }

   useEffect(() => {
      getAllGroup()
      getOneData()
   }, [])

   async function nonActive(val: boolean) {
      try {
         if (val) {
            const res = await fetch(API_ADDRESS.apiDeletePosition, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  data
               }),
            });

            if (res.status == 200) {
               onUpdated(true);
            } else {
               onUpdated(false);
            }
         }
         setModal(false);
      } catch (error) {
         console.log(error);
         setModal(false);
         toast.error("Terjadi kesalahan");
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
                  size="md"
                  radius={10}
                  data={
                     listGroup
                        ? listGroup.map((data) => ({
                           value: data.id,
                           label: data.name,
                        }))
                        : []
                  }
                  value={String(data.idGroup)}
                  mb={5}
                  onChange={(val) => setData({ ...data, idGroup: val })}
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
                  value={String(data.name)}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
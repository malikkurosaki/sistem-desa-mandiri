import { WARNA, LayoutDrawer, API_ADDRESS } from "@/module/_global";
import { Box, Stack, SimpleGrid, Flex, TextInput, Button, Text, Select } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";

type dataGroup = {
   id: string;
   name: string;
};

export default function DrawerListPosition({ onCreated }: { onCreated: (val: boolean) => void }) {
   const [openDrawerGroup, setOpenDrawerGroup] = useState(false)
   const router = useRouter()
   const [listGroup, setListGorup] = useState<dataGroup[]>([])

   const [listData, setListData] = useState({
      name: "",
      idGroup: "",
   })

   async function getAllGroup() {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetAllGroup}&villageId=121212&active=true`)
         const data = await res.json()
         setListGorup(data)
      } catch (error) {
         console.error(error)
      }
   }

   useShallowEffect(() => {
      getAllGroup()
   }, [])


   async function onSubmit() {
      try {
        const res = await fetch(API_ADDRESS.apiCreatePosition, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: listData.name,
            idGroup: listData.idGroup
          })
        })
    
        if (!res.ok) {
          const errorData = await res.json();
          if (errorData.message === "Position sudah ada") {
            toast.error('Gagal! Position sudah ada');
          } else {
            toast.error('Error');
          }
        } else {
          setOpenDrawerGroup(false)
          toast.success('Sukses! data tersimpan')
        }
        onCreated(true)
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
                  onChange={(val: any) => setListData({
                     ...listData,
                     idGroup: val
                  })}
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
                  onChange={(event: any) => setListData({
                     ...listData,
                     name: event.target.value
                   })}
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
                     MASUK
                  </Button>
               </Box>
            </Box>
         </LayoutDrawer>
      </Box>
   );
}
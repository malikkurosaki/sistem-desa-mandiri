'use client'
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { globalMemberDivision } from "@/module/division_new/lib/val_division";
import { useHookstate } from "@hookstate/core";
import { Box, Button, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";

export default function CreateAnnouncement() {
   const [isOpen, setOpen] = useState(false)
   const member = useHookstate(globalMemberDivision)
   const router = useRouter()
   const [selectedFiles, setSelectedFiles] = useState<any>([]);

   function onTrue(val: boolean) {
      if (val) {
         toast.success("Sukses! Data tersimpan");
      }
      setOpen(false)
   }

   async function loadData() {
      setSelectedFiles(JSON.parse(JSON.stringify(member.get())))
   }

   useShallowEffect(() => {
      loadData()
   },[])

   return (
      <Box>
         <pre>
            {JSON.stringify(selectedFiles)}
         </pre>
          <LayoutNavbarNew back="" title="Tambah Pengumuman" menu={<></>} />
         <Stack
            p={20}
         >
            <TextInput
               size="md" type="text" radius={10} placeholder="Judul Pengumuman" withAsterisk label="Judul" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
            />
            <Textarea
               size="md"
               radius={10}
               w={"100%"}
               label="Pengumuman"
               withAsterisk
               placeholder="Deskripsi Pengumuman"
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
            />
            <Box pt={10}>
               <Group justify="space-between" style={{
                  border: `1px solid ${WARNA.biruTua}`,
                  padding: 10,
                  borderRadius: 10
               }}
                  onClick={() => router.push("/announcement/create-user")}
               >
                  <Text size="sm">
                     Tambah Anggota
                  </Text>
                  <IoIosArrowForward />
               </Group>
            </Box>
         </Stack>
         <Box mt={30} mx={20}>
            <Button
               c={"white"}
               bg={WARNA.biruTua}
               size="md"
               radius={30}
               fullWidth
               onClick={() => { setOpen(true) }}
            >
               Simpan
            </Button>
         </Box>
         <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
            description="Apakah Anda yakin ingin menambahkan data?"
            onYes={(val) => { onTrue(val) }} />
      </Box>

   )
}
import { Box, Button, Stack, Textarea, TextInput } from "@mantine/core";
import NavbarEditAnnouncement from "../component/ui/navbar_edit_announcement";
import { WARNA } from "@/module/_global";
import { HiOutlineChevronRight } from "react-icons/hi2";

export default function ViewEditAnnouncement({ data }: { data: string }) {
   return (
      <Box>
         <NavbarEditAnnouncement />
         <Stack
            align="center"
            justify="center"
            gap="xs"
            pt={30}
            px={20}
         >
            <TextInput
               size="md" type="text" radius={30} placeholder="Judul Pengumuman" withAsterisk label="Judul" w={"100%"}
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
               radius={20}
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

            <Button rightSection={<HiOutlineChevronRight size={14} />} variant="default" fullWidth radius={30} size="md" mt={10}>
               Pilih Anggota
            </Button>
         </Stack>
         <Box mt={30} mx={20}>
            <Button
               c={"white"}
               bg={WARNA.biruTua}
               size="md"
               radius={30}
               fullWidth
            >
               Simpan
            </Button>
         </Box>
      </Box>
   )
}
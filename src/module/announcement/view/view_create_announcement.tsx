import { WARNA } from "@/module/_global";
import { Box, Stack, TextInput, Button, Textarea } from "@mantine/core";
import { HiOutlineChevronRight, HiUser } from "react-icons/hi2";
import NavbarCreateAnnouncement from "../component/ui/navbar_create_announcement";

export default function ViewCreateAnnouncement() {
   return (
      <Box>
         <NavbarCreateAnnouncement />
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

            <Button rightSection={<HiOutlineChevronRight  size={14} />} variant="default" fullWidth radius={30} size="md" mt={10}>
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
import { Box, Button, Stack, TextInput } from "@mantine/core";
import NavbarCreateMember from "../component/ui/navbar_create_member";
import { WARNA } from "@/module/_global";
import { HiUser } from "react-icons/hi2";

export default function ViewCreateMember() {
   return (
      <Box>
         <NavbarCreateMember />
         <Stack
            align="center"
            justify="center"
            gap="xs"
            pt={30}
            px={20}
         >
            <Box bg={WARNA.biruTua} py={30} px={50}
               style={{
                  borderRadius: 10,
               }}>
               <HiUser size={100} color={WARNA.bgWhite} />
            </Box>
            <TextInput
               size="md" type="number" radius={30} placeholder="NIK" withAsterisk label="NIK" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
            />
            <TextInput
               size="md" type="text" radius={30} placeholder="Nama" withAsterisk label="Nama" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
            />
            <TextInput
               size="md" type="email" radius={30} placeholder="Email" withAsterisk label="Email" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
            />
            <TextInput
               size="md" type="number" radius={30} placeholder="+62...." withAsterisk label="Nomor Telepon" w={"100%"}
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
            />
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
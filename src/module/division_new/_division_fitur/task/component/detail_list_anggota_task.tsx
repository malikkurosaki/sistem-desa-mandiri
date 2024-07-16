import { WARNA } from "@/module/_global";
import { Box, Group, Flex, Avatar, Text } from "@mantine/core";


const dataAnggota = [
   {
     id: 1,
     name: "Iqbal Ramadan",
     image: "https://i.pravatar.cc/1000?img=5",
     email: "iqbal.ramadan@gmail.com",
   },
   {
     id: 2,
     name: "Doni Setiawan",
     image: "https://i.pravatar.cc/1000?img=10",
     email: "doni.setiawan@gmail.com",
   },
   {
     id: 3,
     name: "Rangga Agung",
     image: "https://i.pravatar.cc/1000?img=51",
     email: "rangga.agung@gmail.com",
   },
   {
     id: 4,
     name: "Ramadan Sananta",
     image: "https://i.pravatar.cc/1000?img=15",
     email: "ramadan@gmail.com",
   },
   {
     id: 5,
     name: "Imam Baroni",
     image: "https://i.pravatar.cc/1000?img=22",
     email: "imam.baroni@gmail.com",
   },
 ];


export default function ListAnggotaDetailTask() {
   return (
      <Box pt={20}>
         <Group justify="space-between">
            <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
            <Text c={WARNA.biruTua}>Total 10 Anggota</Text>
         </Group>
         <Box pt={10}>
            <Box mb={20}>
               <Box
                  style={{
                     border: `1px solid ${"#C7D6E8"}`,
                     borderRadius: 10,
                  }}
                  px={20}
                  py={10}
               >
                  <Text c={WARNA.biruTua} fw={"bold"}>
                     Divisi Kerohanian
                  </Text>
                  {dataAnggota.map((v, i) => {
                     return (
                        <Flex
                           justify={"space-between"}
                           align={"center"}
                           mt={20}
                           key={i}
                        >
                           <Group>
                              <Avatar src={v.image} alt="it's me" size="lg" />
                              <Box>
                                 <Text c={WARNA.biruTua} fw={"bold"}>
                                    {v.name}
                                 </Text>
                                 <Text c={"#5A687D"} fz={14}>
                                    {v.email}
                                 </Text>
                              </Box>
                           </Group>
                           <Text c={WARNA.biruTua} fw={"bold"}>
                              Anggota
                           </Text>
                        </Flex>
                     );
                  })}
               </Box>
            </Box>
         </Box>
      </Box>
   )
}
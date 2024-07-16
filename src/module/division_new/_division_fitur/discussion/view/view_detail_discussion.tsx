import { Avatar, Badge, Box, Flex, Group, Text } from "@mantine/core";
import NavbarDetailDiscussion from "../component/navbar_detail_discussion";
import { WARNA } from "@/module/_global";
import { GrChatOption } from "react-icons/gr";

const dataAnggota = [
   {
      id: 1,
      name: "Iqbal Ramadan",
      image: "https://i.pravatar.cc/1000?img=5",
      status: true,
      jumlah: 16,
      desc: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '
   },
   {
      id: 2,
      name: "Doni Setiawan",
      image: "https://i.pravatar.cc/1000?img=10",
      status: true,
      jumlah: 26,
      desc: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
   },
   {
      id: 3,
      name: "Rangga Agung",
      image: "https://i.pravatar.cc/1000?img=51",
      status: false,
      jumlah: 11,
      desc: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
   },
   {
      id: 4,
      name: "Ramadan Sananta",
      image: "https://i.pravatar.cc/1000?img=15",
      status: false,
      jumlah: 30,
      desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. '
   },
   {
      id: 5,
      name: "Imam Baroni",
      image: "https://i.pravatar.cc/1000?img=22",
      status: false,
      jumlah: 29,
      desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text'
   },
];

export default function ViewDetailDiscussion() {

   return (
      <>
         <NavbarDetailDiscussion />
         <Box p={20}>
            <Flex
               justify={"space-between"}
               align={"center"}
               mt={20}
            >
               <Group>
                  <Avatar src={'https://i.pravatar.cc/1000?img=5'} alt="it's me" size="lg" />
                  <Box>
                     <Text c={WARNA.biruTua} fw={"bold"}>
                        Fibra Marcell
                     </Text>
                     <Badge color={"green"} size="sm">BUKA</Badge>
                  </Box>
               </Group>
               <Text c={"grey"}>1 Jam</Text>
            </Flex>
            <Box>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</Box>
            <Group justify="space-between" mt={20} c={'#8C8C8C'}>
               <Group gap={5} align="center">
                  <GrChatOption size={18} />
                  <Text fz={13}>10 Komentar</Text>
               </Group >
            </Group>

            <Box p={10}>
               {dataAnggota.map((v, i) => {
                  return (
                     <Box key={i} style={{ borderBottom: "1px solid #8C8C8C" }} p={5}>
                        <Flex
                           justify={"space-between"}
                           align={"center"}
                        >
                           <Group>
                              <Avatar src={v.image} alt="it's me" size="lg" />
                              <Box>
                                 <Text c={WARNA.biruTua} fw={"bold"}>
                                    {v.name}
                                 </Text>
                              </Box>
                           </Group>
                           <Text c={"grey"}>1 Jam</Text>
                        </Flex>
                        <Box>{v.desc}</Box>
                     </Box>
                  );
               })}
            </Box>

         </Box>
      </>
   )
}
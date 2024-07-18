import { WARNA } from "@/module/_global"
import { Box, Group, ActionIcon, Text } from "@mantine/core"
import { useRouter } from "next/navigation"
import { HiMiniUser } from "react-icons/hi2"

const dataMember = [
   {
      id: 1,
      name: 'Ali akbar',
      desc: 'Perbekel',
      grup: 'Dinas'
   },
   {
      id: 2,
      name: 'Fibra Marcell',
      desc: 'Kasi Kesejahteraan',
      grup: 'Dinas'
   },
   {
      id: 3,
      name: 'Burhan',
      desc: 'Kasi Kesejahteraan',
      grup: 'Dinas'
   },
   {
      id: 4,
      name: 'Chandra',
      desc: 'Kasi Kesejahteraan',
      grup: 'Dinas'
   },
   {
      id: 5,
      name: 'Ayu',
      desc: 'Kasi Kesejahteraan',
      grup: 'PKK'
   },
   {
      id: 6,
      name: 'Heriawan',
      desc: 'Kasi Kesejahteraan',
      grup: 'Karang Taruna'
   },
   {
      id: 7,
      name: 'Jinan',
      desc: 'Kasi Kesejahteraan',
      grup: 'Dinas'
   },
   {
      id: 8,
      name: 'Rizal',
      desc: 'Kasi Kesejahteraan',
      grup: 'LPD'
   },
]

export default function TabListMember() {
   const router = useRouter()

   return (
      <>
         {dataMember.map((v, i) => {
            return (
               <Box pt={20} key={i} onClick={() => {
                  router.push(`/member/${v.id}`)
               }}>
                  <Group align='center' style={{
                     borderBottom: `1px solid #D9D9D9`,
                     padding: 10,
                  }} >
                     <Box>
                        <ActionIcon variant="light" bg={WARNA.biruTua} size={50} radius={100} aria-label="icon">
                           <HiMiniUser color={'white'} size={25} />
                        </ActionIcon>
                     </Box>
                     <Box>
                        <Text fw={'bold'} c={WARNA.biruTua}>{v.name}</Text>
                        <Text fw={'lighter'} fz={12}>{v.grup + ' - ' + v.desc}</Text>
                     </Box>
                  </Group>
               </Box>
            )
         })}
      </>
   )
}
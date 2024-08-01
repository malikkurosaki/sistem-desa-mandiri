
import { API_ADDRESS, WARNA } from "@/module/_global"
import { Box, Group, ActionIcon, Text } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { HiMiniUser } from "react-icons/hi2"

type dataMember = {
   id: string,
   idUserRole: string,
   idVillage: string,
   idGroup: string,
   idPosition: string,
   nik: string,
   name: string,
   phone: string,
   email: string,
   gender: string,
   isActive: boolean

}

export default function TabListMember({ status }: { status: boolean }) {
   const router = useRouter()
   const [loading, setLoading] = useState(true);
   const [dataMember, setDataMember] = useState<dataMember[]>([])


   async function getAllUser() {
      try {
         setLoading(true)
         const res = await fetch(`${API_ADDRESS.apiGetAllUser}&active` + status)
         const data = await res.json()
         setDataMember(data)
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getAllUser()
   }, [])

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
                        {/* <Text fw={'lighter'} fz={12}>{v.grup + ' - ' + v.desc}</Text> */}
                     </Box>
                  </Group>
               </Box>
            )
         })}
      </>
   )
}
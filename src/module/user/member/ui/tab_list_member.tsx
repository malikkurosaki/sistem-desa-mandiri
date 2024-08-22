
import { SkeletonSingle, WARNA } from "@/module/_global"
import { Box, Group, ActionIcon, Text, TextInput } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HiMagnifyingGlass, HiMiniUser } from "react-icons/hi2"
import { IListMember } from "../lib/type_member"
import { funGetAllmember } from "../lib/api_member"


export default function TabListMember() {
   const router = useRouter()
   const [loading, setLoading] = useState(true);
   const [dataMember, setDataMember] = useState<IListMember[]>([])
   const searchParams = useSearchParams()
   const [searchQuery, setSearchQuery] = useState('')
   const group = searchParams.get('group')
   const status = searchParams.get('active')


   async function getAllUser() {
      try {
         setLoading(true)
         const res = await funGetAllmember('?active=' + status + '&group=' + group + '&search=' + searchQuery)
         setDataMember(res.data)
      } catch (error) {
         console.error(error)
         throw new Error("Error")
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getAllUser()
   }, [status, searchQuery])

   return (
      <>
         <Box>
            <TextInput
               styles={{
                  input: {
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               size="md"
               radius={30}
               leftSection={<HiMagnifyingGlass size={20} />}
               placeholder="Pencarian"
               onChange={(e) => setSearchQuery(e.target.value)}
               my={10}
            />
            {loading
               ? Array(6)
                  .fill(null)
                  .map((_, i) => (
                     <Box key={i}>
                        <SkeletonSingle />
                     </Box>
                  ))
               :
               dataMember.length == 0 ?
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                      <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada anggota</Text>
                  </Box>
                  :
                  dataMember.map((v, i) => {
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
                                 <Text fw={'lighter'} fz={12}>{v.group + ' - ' + v.position}</Text>
                              </Box>
                           </Group>
                        </Box>
                     )
                  })
            }
         </Box>
      </>
   )
}
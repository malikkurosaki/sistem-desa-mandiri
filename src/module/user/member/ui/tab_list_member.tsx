
import { globalRole, SkeletonSingle, TEMA, WARNA } from "@/module/_global"
import { Box, Text, TextInput, Divider, Avatar, Grid } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { IListMember } from "../lib/type_member"
import { funGetAllmember } from "../lib/api_member"
import { funGetAllGroup, IDataGroup } from "@/module/group"
import toast from "react-hot-toast"
import _ from "lodash"
import { useHookstate } from "@hookstate/core"


export default function TabListMember() {
   const router = useRouter()
   const [loading, setLoading] = useState(true);
   const [dataMember, setDataMember] = useState<IListMember[]>([])
   const searchParams = useSearchParams()
   const [searchQuery, setSearchQuery] = useState('')
   const group = searchParams.get('group')
   const status = searchParams.get('active')
   const roleLogin = useHookstate(globalRole)
   const [nameGroup, setNameGroup] = useState('')
   const tema = useHookstate(TEMA)


   async function getAllUser() {
      try {
         setLoading(true)
         const res = await funGetAllmember('?active=' + status + '&group=' + group + '&search=' + searchQuery)
         if (res.success) {
            setDataMember(res.data)
            setNameGroup(res.filter.name)
         } else {
            toast.error(res.message)
         }
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
                     color: tema.get().utama,
                     borderRadius: tema.get().utama,
                     borderColor: tema.get().utama,
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
               <Box>
                  {roleLogin.get() == 'supadmin' && <Text>Filter by: {nameGroup}</Text>}
                  {dataMember.length == 0 ?
                     <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada anggota</Text>
                     </Box>
                     :
                     dataMember.map((v, i) => {
                        return (
                           <Box key={i}>
                              <Box onClick={() => {
                                 router.push(`/member/${v.id}`)
                              }}>
                                 <Grid p={10} gutter={{
                                    base: 60,
                                    xl: "xs"
                                 }} align="center">
                                    <Grid.Col span={2}>
                                       <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} size={50} alt="image" />
                                    </Grid.Col>
                                    <Grid.Col span={9}>
                                       <Text fw={'bold'} c={tema.get().utama} lineClamp={1}>{_.startCase(v.name)}</Text>
                                       <Text fw={'lighter'} fz={12}>{v.group + ' - ' + v.position}</Text>
                                    </Grid.Col>
                                 </Grid>
                              </Box>
                              <Divider my={10} />
                           </Box>
                        )
                     })
                  }
               </Box>
            }
         </Box>
      </>
   )
}
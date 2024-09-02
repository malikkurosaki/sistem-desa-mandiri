
import { SkeletonSingle, WARNA } from "@/module/_global"
import { Box, Group, ActionIcon, Text, TextInput, Divider, Avatar } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HiMagnifyingGlass, HiMiniUser } from "react-icons/hi2"
import { IListMember } from "../lib/type_member"
import { funGetAllmember } from "../lib/api_member"
import { funGetAllGroup, IDataGroup } from "@/module/group"
import toast from "react-hot-toast"
import _ from "lodash"


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

   const [checked, setChecked] = useState<IDataGroup[]>([]);

   const groupNameMap = (groupId: string) => {
      const groupName = checked.find((group) => group.id === groupId)?.name;
      return groupName || '-';
   };

   async function getAllGroupFilter() {
      try {
         const response = await funGetAllGroup('?active=true')
         if (response.success) {
            setChecked(response.data);
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan grup, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getAllGroupFilter();
   }, []);

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
               <Box>
                  {group && <Text>Filter by: {groupNameMap(group)}</Text>}
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
                                 <Group align='center' style={{
                                    padding: 10,
                                 }} >
                                    <Box>
                                       <Avatar src={`/api/file/img?cat=user&file=${v.img}`} size={50} alt="image" />
                                    </Box>
                                    <Box>
                                       <Text fw={'bold'} c={WARNA.biruTua} lineClamp={1}>{_.startCase(v.name)}</Text>
                                       <Text fw={'lighter'} fz={12}>{v.group + ' - ' + v.position}</Text>
                                    </Box>
                                 </Group>
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
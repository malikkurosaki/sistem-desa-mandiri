'use client'
import { WARNA } from "@/module/_global"
import LayoutModal from "@/module/_global/layout/layout_modal"
import { Box, Group, Avatar, Textarea, Button } from "@mantine/core"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function FormEditDiscussion() {
   const [isValModal, setValModal] = useState(false)
   const router = useRouter()

   function onTrue(val: boolean) {
      if (val) {
         toast.success("Sukses! Data tersimpan");
         router.back()

      }
      setValModal(false)
   }

   return (
      <Box>
         <Box p={20}>
            <Group>
               <Avatar src={'https://i.pravatar.cc/1000?img=32'} alt="it's me" size="lg" />
               <Box>
                  <Textarea
                     placeholder="Tuliskan apa yang ingin anda diskusikan"
                     w={"100%"}
                     styles={{
                        input: {
                           border: 'none',
                           backgroundColor: 'transparent',
                        }
                     }}
                  />
               </Box>
            </Group>
            <Box mt="xl">
               <Button
                  color="white"
                  bg={WARNA.biruTua}
                  size="lg"
                  radius={30}
                  fullWidth
                  onClick={() => setValModal(true)}
               >
                  Simpan
               </Button>
            </Box>
         </Box>

         <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
            description="Apakah Anda yakin ingin mengubah data?"
            onYes={(val) => { onTrue(val) }} />
      </Box>
   )
}
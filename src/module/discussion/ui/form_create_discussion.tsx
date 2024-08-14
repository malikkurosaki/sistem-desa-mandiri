'use client'
import { WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Avatar, Box, Button, Center, Grid, Group, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { funCreateDiscussion } from "../lib/api_discussion";

export default function FormCreateDiscussion({id}: {id: string}) {
   const [isValModal, setValModal] = useState(false)
   const [isData, setData] = useState({
      desc: "",
      idDivision: id
   })


   function onTrue(val: boolean) {
      if (val) {
         toast.success("Sukses! Data tersimpan");
      }
      setValModal(false)
   }

   async function createDiscussion(val: boolean) {
      try {
         const response = await funCreateDiscussion({
            desc: isData.desc,
            idDivision: id
         })

         if (response.success) {
            toast.success(response.message)
            onTrue(true)
         } else {
            toast.error(response.message)
         }
      } catch (error) {
         console.log(error);
         toast.error("Gagal menambahkan diskusi, coba lagi nanti");
      } finally {
         setValModal(false)
      }
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
                     onChange={(e) => setData({ ...isData, desc: e.target.value })}
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
            description="Apakah Anda yakin ingin
        menambah data?"
            onYes={(val) => { createDiscussion(val) }} />
      </Box>
   )
}  
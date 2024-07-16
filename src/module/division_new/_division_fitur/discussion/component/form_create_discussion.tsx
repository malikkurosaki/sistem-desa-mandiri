'use client'
import { WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Avatar, Box, Button, Center, Grid, Group, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormCreateDiscussion() {
   const [isValModal, setValModal] = useState(false)

   function onTrue(val: boolean) {
      if (val) {
         toast.success("Sukses! Data tersimpan");
      }
      setValModal(false)
   }

   return (
      <Box>
         <Box p={20}>
            <Grid gutter={2}>
               <Grid.Col span={"auto"}>
                  <Center>
                     <Avatar src={'https://i.pravatar.cc/1000?img=32'} alt="it's me" size="lg" />
                  </Center>
               </Grid.Col>
               <Grid.Col span={10}>
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
               </Grid.Col>
            </Grid>
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
            onYes={(val) => { onTrue(val) }} />
      </Box>
   )
}  
'use client'
import { WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Box, Image, Text, Center, Paper, Stack, UnstyledButton } from "@mantine/core";
import * as ICON from '../../../division/lib/file_icon'
import { useRouter } from "next/navigation";

const iconContainer = (icon: string) => 'data:image/svg+xml;base64,' + btoa(icon)

const listDocument = [

   {
      "id": "1",
      "title": "image 1",
      "description": "description 1",
      "image": iconContainer(ICON.IMAGE),
   },
   {
      "id": "2",
      "title": "data pdf",
      "description": "description 2",
      "image": iconContainer(ICON.PDF),
   },
   {
      "id": "3",
      "title": "data pdf 3",
      "description": "description 3",
      "image": iconContainer(ICON.PDF),
   },
   {
      "id": "4",
      "title": "text 4",
      "description": "description 4",
      "image": iconContainer(ICON.TEXT),
   },
   {
      "id": "5",
      "title": "text 5",
      "description": "description 5",
      "image": iconContainer(ICON.TEXT),
   }
]

export default function ListDocumentOnDetailDivision() {
   const router = useRouter()
   return (
      <Box pt={10}>
         <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Dokumen Terbaru</Text>
         <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
            {
               listDocument.map((v) => <Carousel.Slide key={v.id}>
                  <UnstyledButton onClick={() => router.push(`/document`)}>
                     <Stack gap={0}>
                        <Paper withBorder shadow="sm" radius={12} >
                           <Center p={"md"}>
                              <Image w={"75"} src={v.image} alt="image" />
                           </Center>
                        </Paper>
                        <Box p={"sm"}>
                           <Text c={"dimmed"} truncate="end"ta={"center"}>{v.title}</Text>
                        </Box>
                     </Stack>
                  </UnstyledButton>
               </Carousel.Slide>
               )}
         </Carousel>
      </Box>
   )
}
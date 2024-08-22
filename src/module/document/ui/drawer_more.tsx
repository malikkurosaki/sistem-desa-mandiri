import { LayoutDrawer, WARNA } from "@/module/_global";
import { Box, Flex, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { LuFolders, LuFolderSymlink } from "react-icons/lu";
import DrawerCutDocuments from "./drawer_cut_documents";
import DrawerCopyDocuments from "./drawer_copy_documents";
import { IDataDocument, IFormDetailMoreItem } from "../lib/type_document";
import toast from "react-hot-toast";
import { funCopyDocument, funMoveDocument } from "../lib/api_document";
import { useHookstate } from "@hookstate/core";
import { globalRefreshDocument } from "../lib/val_document";
import { useParams } from "next/navigation";

export default function DrawerMore({ data }: { data: IDataDocument[] }) {
  const [isCut, setIsCut] = useState(false)
  const [isCopy, setIsCopy] = useState(false)
  const refresh = useHookstate(globalRefreshDocument)
  const param = useParams<{ id: string }>()


  async function onMoveItem(path: string) {
    try {
      const res = await funMoveDocument({ path, dataItem: data })
      if (res.success) {
        toast.success(res.message)
        refresh.set(true)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal memindahkan item, coba lagi nanti")
    }
    setIsCut(false)
  }


  async function onCopyItem(path: string) {
    try {
      const res = await funCopyDocument({ idDivision: param.id, path, dataItem: data })
      if (res.success) {
        toast.success(res.message)
        refresh.set(true)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal memindahkan item, coba lagi nanti")
    }
    setIsCopy(false)
  }



  return (
    <Box>
      <Stack p={10} >
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Flex onClick={() => setIsCut(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <LuFolderSymlink size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Pindah</Text>
            </Box>
          </Flex>
          <Flex onClick={() => setIsCopy(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <LuFolders size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Salin</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>


      <LayoutDrawer opened={isCut} onClose={() => setIsCut(false)} title={'Pilih Lokasi Pemindahan'} size="lg">
        <DrawerCutDocuments data={data} onChoosePath={(val) => { onMoveItem(val) }} category="move" />
      </LayoutDrawer>

      <LayoutDrawer opened={isCopy} onClose={() => setIsCopy(false)} title={'Pilih Lokasi Salin'} size="lg">
        <DrawerCutDocuments data={data} onChoosePath={(val) => { onCopyItem(val) }} category="copy" />
      </LayoutDrawer>
    </Box>
  );
}

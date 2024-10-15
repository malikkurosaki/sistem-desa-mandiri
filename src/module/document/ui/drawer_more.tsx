import { keyWibu, LayoutDrawer, TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, Flex, SimpleGrid, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuFolders, LuFolderSymlink } from "react-icons/lu";
import { funCopyDocument, funMoveDocument } from "../lib/api_document";
import { IDataDocument } from "../lib/type_document";
import { globalRefreshDocument } from "../lib/val_document";
import DrawerCutDocuments from "./drawer_cut_documents";
import { useWibuRealtime } from "wibu-realtime";

export default function DrawerMore({ data }: { data: IDataDocument[] }) {
  const [isCut, setIsCut] = useState(false)
  const [isCopy, setIsCopy] = useState(false)
  const refresh = useHookstate(globalRefreshDocument)
  const param = useParams<{ id: string }>()
  const [forbidCopy, setForbidCopy] = useState(true)
  const tema = useHookstate(TEMA)
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })


  async function onMoveItem(path: string) {
    try {
      const res = await funMoveDocument({ path, dataItem: data })
      if (res.success) {
        setDataRealtime([{
          category: "division-document",
          id: path,
        }])
        toast.success(res.message)
        refresh.set(true)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal memindahkan item, coba lagi nanti")
    }
    setIsCut(false)
  }


  async function onCopyItem(path: string) {
    try {
      const res = await funCopyDocument({ idDivision: param.id, path, dataItem: data })
      if (res.success) {
        setDataRealtime([{
          category: "division-document",
          id: path,
        }])
        toast.success(res.message)
        refresh.set(true)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal memindahkan item, coba lagi nanti")
    }
    setIsCopy(false)
  }


  function cekFileSelected() {
    const cek = data.some((i: any) => i.category == "FOLDER")
    setForbidCopy(cek)
  }

  useShallowEffect(() => {
    cekFileSelected()
  }, [data])



  return (
    <Box>
      <Stack p={10} >
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Flex onClick={() => setIsCut(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <LuFolderSymlink size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama}>Pindah</Text>
            </Box>
          </Flex>
          {
            (!forbidCopy) &&
            <Flex onClick={() => setIsCopy(true)} justify={'center'} align={'center'} direction={'column'} >
              <Box>
                <LuFolders size={30} color={tema.get().utama} />
              </Box>
              <Box>
                <Text c={tema.get().utama}>Salin</Text>
              </Box>
            </Flex>
          }
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

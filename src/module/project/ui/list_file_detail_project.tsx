'use client'
import { keyWibu, LayoutDrawer, LayoutModalViewFile, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, Grid, Group, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsFileTextFill, BsFiletypeCsv, BsFiletypeHeic, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa6';
import { useWibuRealtime } from 'wibu-realtime';
import { funDeleteFileProject, funGetOneProjectById } from '../lib/api_project';
import { IDataFileProject } from '../lib/type_project';

export default function ListFileDetailProject() {
  const [isData, setData] = useState<IDataFileProject[]>([])
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [idData, setIdData] = useState('')
  const [idStorage, setIdStorage] = useState('')
  const [nameData, setNameData] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenModalView, setOpenModalView] = useState(false)
  const [isExtension, setExtension] = useState('')
  const tema = useHookstate(TEMA)
  const isMobile = useMediaQuery("(max-width: 350px)");
  const [reason, setReason] = useState("")
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  async function getOneDataCancel() {
    try {
      const res = await funGetOneProjectById(param.id, 'data');
      if (res.success) {
        setReason(res.data.reason);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan data Kegiatan, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    getOneDataCancel();
  }, [param.id])

  async function getOneData(loading: boolean) {
    try {
      setLoading(loading)
      const res = await funGetOneProjectById(param.id, 'file');
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan file kegiatan, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getOneData(true);
  }, [param.id])


  async function onDelete() {
    try {
      setLoadingDelete(true)
      const res = await funDeleteFileProject(idData);
      if (res.success) {
        setDataRealtime([{
          category: "project-detail-file",
          id: param.id,
        }])
        toast.success(res.message)
        getOneData(false)
        setIdData("")
        setIdStorage("")
        setOpenDrawer(false)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus file, coba lagi nanti");
    } finally {
      setOpenModal(false)
      setLoadingDelete(false)
    }

  }

  useShallowEffect(() => {
    if (dataRealTime && dataRealTime.some((i: any) => i.category == 'project-detail-file' && i.id == param.id)) {
      getOneData(false)
    } else if (dataRealTime && dataRealTime.some((i: any) => i.category == 'project-detail-status' && i.id == param.id)) {
      getOneDataCancel()
    }
  }, [dataRealTime])

  return (
    <>
      <Box pt={20}>
        <Text fw={'bold'} c={tema.get().utama}>File</Text>
        <Box bg={"white"} style={{
          borderRadius: 10,
          border: `1px solid ${"#D6D8F6"}`,
          padding: 20
        }}>
          {

            loading ?
              Array(1)
                .fill(null)
                .map((_, i) => (
                  <Box key={i} mb={10}>
                    <Group>
                      <Skeleton width={30} height={30} radius={"md"} />
                      <Skeleton width={"50%"} height={30} radius={"md"} />
                    </Group>
                  </Box>
                ))
              :
              isData.length === 0 ? <Text c={"dimmed"} ta={"center"}>Tidak ada file</Text> :
                isData.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      style={{
                        borderRadius: 10,
                        border: `1px solid ${"#D6D8F6"}`,
                        padding: 10
                      }}
                      mb={10}

                      onClick={() => {
                        setNameData(item.name + '.' + item.extension)
                        setExtension(item.extension)
                        setIdData(item.id)
                        setIdStorage(item.idStorage)
                        setOpenDrawer(true)
                      }}
                    >
                      <Grid justify='center' align='center'>
                        <Grid.Col span={{
                          base: 1.5,
                          xs: 1,
                          sm: 1,
                          md: 1,
                          lg: 1,
                          xl: 1,
                        }}>
                          {item.extension == "pdf" && <BsFiletypePdf size={30} />}
                          {item.extension == "csv" && <BsFiletypeCsv size={30} />}
                          {item.extension == "png" && <BsFiletypePng size={30} />}
                          {item.extension == "jpg" && <BsFiletypeJpg size={30} />}
                          {item.extension == "jpeg" && <BsFiletypeJpg size={30} />}
                          {item.extension == "PNG" && <BsFiletypePng size={30} />}
                          {item.extension == "JPG" && <BsFiletypeJpg size={30} />}
                          {item.extension == "JPEG" && <BsFiletypeJpg size={30} />}
                          {item.extension == "heic" && <BsFiletypeHeic size={30} />}
                        </Grid.Col>
                        <Grid.Col
                          span={{
                            base: 10.5,
                            xs: 11,
                            sm: 11,
                            md: 11,
                            lg: 11,
                            xl: 11,
                          }}
                        >
                          <Text style={{
                            overflowWrap: "break-word"
                          }} pl={isMobile ? 10 : 0} truncate="end">{item.name + '.' + item.extension}</Text>
                        </Grid.Col>
                      </Grid>
                      <Group>
                      </Group>
                    </Box>
                  )
                })
          }
        </Box>



        <LayoutDrawer opened={openDrawer} title={<Text truncate="end">{nameData}</Text>} onClose={() => setOpenDrawer(false)}>
          <Box>
            <Stack pt={10}>
              <SimpleGrid
                cols={{ base: 3, sm: 3, lg: 3 }}
              >
                <Flex onClick={() => { setOpenModalView(true) }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                    <BsFileTextFill size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                    <Text c={tema.get().utama}>Lihat file</Text>
                  </Box>
                </Flex>

                <Flex onClick={() => {
                  reason == null ?
                    setOpenModal(true)
                    : setOpenModal(false)
                }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                    <FaTrash size={30} color={reason == null ? tema.get().utama : "gray"} />
                  </Box>
                  <Box>
                    <Text c={reason == null ? tema.get().utama : "gray"}>Hapus file</Text>
                  </Box>
                </Flex>
              </SimpleGrid>
            </Stack>
          </Box>
        </LayoutDrawer>


        <LayoutModal loading={loadingDelete} opened={isOpenModal} onClose={() => setOpenModal(false)}
          description="Apakah Anda yakin ingin menghapus file ini? File yang dihapus tidak dapat dikembalikan"
          onYes={(val) => {
            if (val) {
              onDelete()
            } else {
              setOpenModal(false)
            }
          }} />

        <LayoutModalViewFile opened={isOpenModalView} onClose={() => setOpenModalView(false)} file={idStorage} extension={isExtension} fitur='project' />
      </Box>
    </>
  );
}


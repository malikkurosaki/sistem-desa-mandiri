'use client'
import { keyWibu, LayoutDrawer, SkeletonDetailListTugasTask, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Center, Checkbox, Divider, Flex, Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineFileDone, AiOutlineFileSync } from 'react-icons/ai';
import { FaCheck, FaPencil, FaTrash } from 'react-icons/fa6';
import { useWibuRealtime } from 'wibu-realtime';
import { funDeleteDetailProject, funGetOneProjectById, funUpdateStatusProject } from '../lib/api_project';
import { IDataListTaskProject } from '../lib/type_project';
import { globalRefreshProject, valStatusDetailProject } from '../lib/val_project';

export default function ListTugasDetailProject() {
  const [isData, setData] = useState<IDataListTaskProject[]>([])
  const [loading, setLoading] = useState(true)
  const param = useParams<{ id: string }>()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [idData, setIdData] = useState('')
  const refresh = useHookstate(globalRefreshProject)
  const [statusData, setStatusData] = useState(0)
  const [openDrawerStatus, setOpenDrawerStatus] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const router = useRouter()
  const tema = useHookstate(TEMA)
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
      const res = await funGetOneProjectById(param.id, 'task');
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan list tugas Kegiatan, coba lagi nanti");
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
      const res = await funDeleteDetailProject(idData, { idProject: param.id });
      if (res.success) {
        setDataRealtime([{
          category: "project-detail-task",
          id: param.id,
        }])
        toast.success(res.message);
        getOneData(false);
        setIdData("")
        setOpenDrawer(false)
        refresh.set(true)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal hapus tugas Kegiatan, coba lagi nanti");
    } finally {
      setOpenModal(false)
      setLoadingDelete(false)
    }
  }

  async function onUpdateStatus(val: number) {
    try {
      const res = await funUpdateStatusProject(idData, { status: val, idProject: param.id });
      if (res.success) {
        setDataRealtime([{
          category: "project-detail-task",
          id: param.id,
        }])
        toast.success(res.message);
        getOneData(false);
        setIdData("")
        setOpenDrawer(false)
        setOpenDrawerStatus(false)
        refresh.set(true)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal update status tugas Kegiatan, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    if (dataRealTime && dataRealTime.some((i: any) => i.category == 'project-detail-task' && i.id == param.id)) {
      refresh.set(true)
      getOneData(false)
    } else if (dataRealTime && dataRealTime.some((i: any) => i.category == 'project-detail-status' && i.id == param.id)) {
      getOneDataCancel()
    }
  }, [dataRealTime])

  return (
    <>
      <Box pt={20}>
        <Text fw={"bold"} c={tema.get().utama}>
          Tanggal & Tugas
        </Text>
        <Box
          bg={"white"}
          style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
          }}
          pl={20}
          pr={20}
        >
          {
            loading ? <>
              <Box pl={5} pr={5} pt={20} pb={20}>
                <SkeletonDetailListTugasTask />
              </Box>
            </> :
              isData.length === 0 ? <Text py={20} c={"dimmed"} ta={"center"}>Tidak ada tugas</Text> :
                isData.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Box onClick={() => {
                        setIdData(item.id)
                        setStatusData(item.status)
                        reason == null ?
                          setOpenDrawer(true)
                          : setOpenDrawer(false)
                      }} my={18}>
                        <Checkbox color="teal" size="md" checked={(item.status === 1) ? true : false} disabled
                          label={item.status === 1 ? 'Sudah Selesai' : 'Belum Selesai'}
                        />
                        <Box mt={20}>
                          <Box style={{
                            borderRadius: 10,
                            border: `1px solid ${"#D6D8F6"}`,
                            padding: 10
                          }}>
                            <Grid gutter={"sm"} justify='flex-start' align='flex-start'
                            >
                              <Grid.Col span={"auto"}>
                                <Center >
                                  <AiOutlineFileSync size={30} />
                                </Center>
                              </Grid.Col>
                              <Grid.Col span={10}>
                                <Text>{item.title}</Text>
                              </Grid.Col>
                            </Grid>
                          </Box>
                          <Box>
                            <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} my={20}>
                              <Box>
                                <Text>Tanggal Mulai</Text>
                                <Group
                                  justify="center"
                                  bg={"white"}
                                  h={45}
                                  style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
                                >
                                  <Text>{item.dateStart}</Text>
                                </Group>
                              </Box>
                              <Box>
                                <Text >Tanggal Berakhir</Text>
                                <Group
                                  justify="center"
                                  bg={"white"}
                                  h={45}
                                  style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
                                >
                                  <Text>{item.dateEnd}</Text>
                                </Group>
                              </Box>
                            </SimpleGrid>
                          </Box>
                        </Box>
                      </Box>
                      <Divider my={20} />
                    </Box>
                  )
                })
          }
        </Box>
        <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
          <Box>
            <Stack pt={10}>
              <SimpleGrid
                cols={{ base: 2, sm: 3, lg: 3 }}
                style={{
                  alignContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <Flex onClick={() => { setOpenDrawerStatus(true) }} justify={'center'} align={'center'} direction={'column'} pb={20}>
                  <Box>
                    <AiOutlineFileDone size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                    <Text c={tema.get().utama}>Update status</Text>
                  </Box>
                </Flex>

                <Flex onClick={() => { router.push('update/' + idData) }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                    <FaPencil size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                    <Text c={tema.get().utama}>Edit tugas</Text>
                  </Box>
                </Flex>

                <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                    <FaTrash size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                    <Text c={tema.get().utama}>Hapus tugas</Text>
                  </Box>
                </Flex>
              </SimpleGrid>
            </Stack>
          </Box>
        </LayoutDrawer>

        <LayoutModal loading={loadingDelete} opened={isOpenModal} onClose={() => setOpenModal(false)}
          description="Apakah Anda yakin ingin menghapus tahapan tugas ini?"
          onYes={(val) => {
            if (val) {
              onDelete()
            } else {
              setOpenModal(false)
            }
          }} />

        <LayoutDrawer opened={openDrawerStatus} title={'Status'} onClose={() => setOpenDrawerStatus(false)}>
          <Box>
            {
              valStatusDetailProject.map((item, index) => {
                return (
                  <Box key={index} onClick={() => { onUpdateStatus(item.value) }}>
                    <Flex justify={"space-between"} align={"center"}>
                      <Group>
                        <Text style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                          {item.name}
                        </Text>
                      </Group>
                      <Text
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: 20,
                        }}
                      >
                        {statusData === item.value ? <FaCheck style={{ marginRight: 10 }} /> : ""}
                      </Text>
                    </Flex>
                    <Divider my={20} />
                  </Box>
                )
              })
            }
          </Box>
        </LayoutDrawer>

      </Box>
    </>
  );
}


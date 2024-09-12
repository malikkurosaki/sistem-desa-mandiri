'use client'
import { LayoutDrawer, SkeletonDetailListTugasTask, TEMA } from '@/module/_global';
import { Box, Center, Checkbox, Divider, Flex, Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineFileDone, AiOutlineFileSync } from 'react-icons/ai';
import { funDeleteDetailProject, funGetOneProjectById, funUpdateStatusProject } from '../lib/api_project';
import { useParams, useRouter } from 'next/navigation';
import { useShallowEffect } from '@mantine/hooks';
import { IDataListTaskProject } from '../lib/type_project';
import { useHookstate } from '@hookstate/core';
import { globalRefreshProject, valStatusDetailProject } from '../lib/val_project';
import { FaCheck, FaPencil, FaTrash } from 'react-icons/fa6';
import LayoutModal from '@/module/_global/layout/layout_modal';

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
  const router = useRouter()
  const tema = useHookstate(TEMA)

  async function getOneData() {
    try {
      setLoading(true)
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
    getOneData();
  }, [param.id])

  async function onDelete() {
    try {
      const res = await funDeleteDetailProject(idData, { idProject: param.id });
      if (res.success) {
        toast.success(res.message);
        getOneData();
        setIdData("")
        setOpenDrawer(false)
        refresh.set(true)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal hapus tugas Kegiatan, coba lagi nanti");
    }
  }

  async function onUpdateStatus(val: number) {
    try {
      const res = await funUpdateStatusProject(idData, { status: val, idProject: param.id });
      if (res.success) {
        toast.success(res.message);
        getOneData();
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
            padding: 20,
          }}
        >
          {
            loading ? <>
              <SkeletonDetailListTugasTask />
            </> :
              isData.length === 0 ? <Text>Tidak ada tugas</Text> :
                isData.map((item, index) => {
                  return (
                    <Box key={index} mb={20}>
                      <Box onClick={() => {
                        setIdData(item.id)
                        setStatusData(item.status)
                        setOpenDrawer(true)
                      }}>
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
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} mt={20}>
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
                      <Divider my={"lg"} />
                    </Box>
                  )
                })
          }
        </Box>
        <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
          <Box>
            <Stack pt={10}>
              <SimpleGrid
                cols={{ base: 3, sm: 3, lg: 3 }}
              >
                <Flex onClick={() => { setOpenDrawerStatus(true) }} justify={'center'} align={'center'} direction={'column'} >
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

        <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
          description="Apakah Anda yakin ingin menghapus Kegiatan ini?"
          onYes={(val) => {
            if (val) {
              onDelete()
            }
            setOpenModal(false)
          }} />

        <LayoutDrawer opened={openDrawerStatus} title={'Status'} onClose={() => setOpenDrawerStatus(false)}>
          <Box>
            <Stack pt={10}>
              {
                valStatusDetailProject.map((item, index) => {
                  return (
                    <Box mb={5} key={index} onClick={() => { onUpdateStatus(item.value) }}>
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
                      <Divider my={"md"} />
                    </Box>
                  )
                })
              }

            </Stack>
          </Box>
        </LayoutDrawer>

      </Box>
    </>
  );
}


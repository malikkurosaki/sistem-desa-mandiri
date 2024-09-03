'use client'
import { LayoutDrawer, LayoutModalViewFile, WARNA } from '@/module/_global';
import { Box, Center, Flex, Grid, Group, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { funDeleteFileProject, funGetOneProjectById } from '../lib/api_project';
import { useParams } from 'next/navigation';
import { useShallowEffect } from '@mantine/hooks';
import { IDataFileProject } from '../lib/type_project';
import { BsFileTextFill, BsFiletypeCsv, BsFiletypeHeic, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from 'react-icons/bs';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { FaTrash } from 'react-icons/fa6';

export default function ListFileDetailProject() {
  const [isData, setData] = useState<IDataFileProject[]>([])
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [idData, setIdData] = useState('')
  const [nameData, setNameData] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenModalView, setOpenModalView] = useState(false)
  const [isExtension, setExtension] = useState('')

  async function getOneData() {
    try {
      setLoading(true)
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
    getOneData();
  }, [param.id])


  async function onDelete() {
    try {
      const res = await funDeleteFileProject(idData);
      if (res.success) {
        toast.success(res.message)
        getOneData()
        setIdData("")
        setOpenDrawer(false)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus file, coba lagi nanti");
    }

  }

  return (
    <>
      <Box pt={20}>
        <Text fw={'bold'} c={WARNA.biruTua}>File</Text>
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
              isData.length === 0 ? <Text>Tidak ada file</Text> :
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
                        setOpenDrawer(true)
                      }}
                    >
                      <Grid gutter={"sm"} justify='flex-start' align='flex-start'>
                        <Grid.Col span={"auto"}>
                          <Center >
                            {item.extension == "pdf" && <BsFiletypePdf size={30} />}
                            {item.extension == "csv" && <BsFiletypeCsv size={30} />}
                            {item.extension == "png" && <BsFiletypePng size={30} />}
                            {item.extension == "jpg" || item.extension == "jpeg" && <BsFiletypeJpg size={30} />}
                            {item.extension == "heic" && <BsFiletypeHeic size={30} />}
                          </Center>
                        </Grid.Col>
                        <Grid.Col span={10}>
                          <Text>{item.name + '.' + item.extension}</Text>
                        </Grid.Col>
                      </Grid>
                      <Group>
                      </Group>
                    </Box>
                  )
                })
          }
        </Box>



        <LayoutDrawer opened={openDrawer} title={<Text lineClamp={1}>{nameData}</Text>} onClose={() => setOpenDrawer(false)}>
          <Box>
            <Stack pt={10}>
              <SimpleGrid
                cols={{ base: 3, sm: 3, lg: 3 }}
              >
                <Flex onClick={() => { setOpenModalView(true) }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                    <BsFileTextFill size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                    <Text c={WARNA.biruTua}>Lihat file</Text>
                  </Box>
                </Flex>

                <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                    <FaTrash size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                    <Text c={WARNA.biruTua}>Hapus file</Text>
                  </Box>
                </Flex>
              </SimpleGrid>
            </Stack>
          </Box>
        </LayoutDrawer>


        <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
          description="Apakah Anda yakin ingin menghapus file ini? File yang dihapus tidak dapat dikembalikan"
          onYes={(val) => {
            if (val) {
              onDelete()
            }
            setOpenModal(false)
          }} />

        <LayoutModalViewFile opened={isOpenModalView} onClose={() => setOpenModalView(false)} file={idData + '.' + isExtension} extension={isExtension} fitur='project' />
      </Box>
    </>
  );
}


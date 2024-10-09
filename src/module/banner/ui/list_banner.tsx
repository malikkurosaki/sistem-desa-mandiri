'use client'
import { LayoutDrawer, LayoutModalViewFile, TEMA, WARNA } from '@/module/_global';
import SkeletonBanner from '@/module/_global/components/skeleton_banner';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Flex, Group, Image, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFile, FaPencil, FaTrash } from 'react-icons/fa6';
import { funDeleteBanner, funGetAllBanner } from '../lib/api_banner';
import { IDataBanner } from '../lib/type_banner';

function ListBanner() {

  const tema = useHookstate(TEMA)
  const router = useRouter();
  const [isOpenModalView, setOpenModalView] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [idDataStorage, setIdDataStorage] = useState('')
  const [isExtension, setExtension] = useState('')
  const [loading, setLoading] = useState(true)
  const [isData, setData] = useState<IDataBanner[]>([])
  const [idData, setIdData] = useState('')
  const [isPage, setPage] = useState(1)

  const fetchData = async (loading: boolean) => {
    try {
      if (loading)
        setLoading(true)
      const response = await funGetAllBanner('?page=' + isPage)
      if (response.success) {
        setData(response.data.map((banner: { image: any; }) => ({ ...banner, image: banner.image })));
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error("Gagal mendapatkan banner, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    fetchData(true)
    setPage(1)
  }, [isPage])

  useShallowEffect(() => {
    fetchData(false)
  }, [isPage])


  async function onDelete(id: string) {
    try {
      const res = await funDeleteBanner(id);
      if (res.success) {
        toast.success(res.message)
        setData(isData.filter((banner) => banner.id !== id));
        setIdData("")
        setIdDataStorage("")
        setOpenDrawer(false)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus banner, coba lagi nanti");
    }

  }




  return (
    <Box pt={2}>
      <Box p={20}>
        {loading
          ?
          Array(7)
            .fill(null)
            .map((_, i) => (
              <Box key={i} mb={20}>
                <SkeletonBanner />
              </Box>
            ))
          :
          <Box >

            {isData.length == 0 ?
              <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75vh" }}>
                <Text c={"dimmed"} ta={"center"} fs={"italic"}>Tidak ada Banner</Text>
              </Box>
              :
              isData.map((v, i) => {
                return (
                  <Box key={i} mb={20}>
                  <Paper radius={'md'} withBorder onClick={() => {
                    setIdData(v.id);
                    setIdDataStorage(v.image);
                    setExtension(v.extension);
                    setOpenDrawer(true)
                  }
                  }
                    style={{
                      width: '100%',
                      maxWidth: 550,
                      height: 85,
                      backgroundColor: 'transparent',
                      border: `1px solid ${tema.get().bgTotalKegiatan}`

                    }}>
                    <Group mt={"25"}>
                      <ActionIcon variant='transparent' w={"100"}>
                        <Image
                          radius={"xs"}
                          src={`https://wibu-storage.wibudev.com/api/files/${v.image}`}
                          alt=''
                          w={76}
                          h={38.9}
                        />
                      </ActionIcon>
                      <Text c={"dark"} fz={"h4"}>{v.title}</Text>
                    </Group>
                  </Paper>
                  </Box>
                )
              })
            }
          </Box>
        }
      </Box>
      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <Box>
          <Stack pt={10}>
            <SimpleGrid
              cols={{ base: 2, sm: 3, lg: 3 }}
              style={{
                alignContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <Flex onClick={() => router.push(`/banner/edit/${idData}`)} direction="column" align="center" justify="center" pb={20}>
                <Box>
                  <FaPencil size={30} color={WARNA.biruTua} />
                </Box>
                <Box>
                  <Text c={tema.get().utama} fz={{ base: 'sm', md: 'md' }}>Edit</Text>
                </Box>
              </Flex>


              <Flex onClick={() => { setOpenModalView(true) }} direction={"column"} align={"center"} justify={"center"}>
                <Box>
                  <FaFile size={30} color={tema.get().utama} />
                </Box>
                <Box>
                  <Text c={tema.get().utama} fz={{ base: 'sm', md: 'md' }}>Lihat File</Text>
                </Box>
              </Flex>

              <Flex onClick={() => { setOpenModal(true) }} direction={"column"} align={"center"} justify={"center"}>
                <Box>
                  <FaTrash size={30} color={tema.get().utama} />
                </Box>
                <Box>
                  <Text c={tema.get().utama} fz={{ base: 'sm', md: 'md' }}>Hapus</Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Stack>
        </Box>
      </LayoutDrawer>

      <LayoutModal
        opened={isOpenModal}
        onClose={() => setOpenModal(false)}
        description='Apakah Anda yakin ingin menghapus banner?'
        onYes={(val) => {
          if (val) {
            onDelete(idData)
          }
          setOpenModal(false)
        }} />

      <LayoutModalViewFile opened={isOpenModalView} onClose={() => setOpenModalView(false)} file={idDataStorage} extension={isExtension} fitur="image" />
    </Box>
  );
}
export default ListBanner;


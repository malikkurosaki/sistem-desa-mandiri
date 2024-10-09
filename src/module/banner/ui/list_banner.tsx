'use client'
import { currentScroll, LayoutDrawer, LayoutModalViewFile, TEMA, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Anchor, Box, Flex, Group, Image, Paper, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaFile, FaPencil, FaTrash } from 'react-icons/fa6';
import { IDataBanner } from '../lib/type_banner';
import toast from 'react-hot-toast';
import { useShallowEffect } from '@mantine/hooks';
import { funDeleteBanner, funGetAllBanner, funGetOneBanner } from '../lib/api_banner';
import { HiMagnifyingGlass } from 'react-icons/hi2';

function ListBanner() {
  const [isList, setIsList] = useState(false)
  const tema = useHookstate(TEMA)
  const router = useRouter();
  const param = useParams<{ id: string }>()
  const [isOpenModalView, setOpenModalView] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [idDataStorage, setIdDataStorage] = useState('')
  const [isExtension, setExtension] = useState('')
  const [loading, setLoading] = useState(true)
  const [isData, setData] = useState<IDataBanner[]>([])
  const [idData, setIdData] = useState('')
  const [isPage, setPage] = useState(1)
  const [searchQuerry, setSearchQuerry] = useState('')
  // const { value: containerRef } = useHookstate(currentScroll);

  const handleList = () => {
    setIsList(!isList)
  }

  const fetchData = async (loading: boolean) => {
    try {
      if (loading)
        setLoading(true)
      const response = await funGetAllBanner('?search=' + searchQuerry)
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

  function searchBanner(search: string) {
    setSearchQuerry(search)
    setPage(1)
  }


  useShallowEffect(() => {
    fetchData(true)
  }, [searchQuerry])

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
        <TextInput
          styles={{
            input: {
              color: tema.get().utama,
              borderRadius: '#A3A3A3',
              borderColor: '#A3A3A3',
            },
          }}
          size='md'
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder='pencarian'
          value={searchQuerry}
          onChange={(val) => { searchBanner(val.target.value) }}
        />

      </Box>

      <Box p={20}>
        <Anchor underline='never'>
          <Stack align='center' justify='center'>
            {isData.map((v, index) => (
              <Paper radius={'md'} withBorder key={index} onClick={() => {
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
                <Group mt={"15"}>
                  <ActionIcon variant='transparent' w={"100"}>
                    <Image
                      radius={"xs"}
                      src={`https://wibu-storage.wibudev.com/api/files/${v.image}`}
                      alt=''
                      w={76}
                      h={38.9}
                    />
                  </ActionIcon>
                  <Flex direction={"column"}>
                    <Text c={"dark"} fz={"h4"}>{v.title}</Text>
                  </Flex>
                </Group>
              </Paper>
            ))}

          </Stack>
        </Anchor>
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
                  <Text c={tema.get().utama} fz={{ base: 'sm', md: 'md'}}>Lihat File</Text>
                </Box>
              </Flex>

              <Flex onClick={() => { setOpenModal(true) }} direction={"column"} align={"center"} justify={"center"}>
                <Box>
                  <FaTrash size={30} color={tema.get().utama} />
                </Box>
                <Box>
                  <Text c={tema.get().utama} fz={{ base: 'sm', md: 'md'}}>Hapus</Text>
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





// useEffect(() => {
//   const handleScroll = async () => {
//     if (containerRef && containerRef.current) {
//       const scrollTop = containerRef.current.scrollTop;
//       const containerHeight = containerRef.current.clientHeight;
//       const scrollHeight = containerRef.current.scrollHeight;

//       if (scrollTop + containerHeight + 1 >= scrollHeight) {
//         setPage(isPage + 1)
//       }
//     }
//   };

//   const container = containerRef?.current;
//   container?.addEventListener("scroll", handleScroll);

//   return () => {
//     container?.removeEventListener("scroll", handleScroll);
//   };
// }, [containerRef, isPage]);


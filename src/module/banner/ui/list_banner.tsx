'use client'
import { LayoutDrawer, LayoutModalViewFile, TEMA, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Anchor, Box, Flex, Group, Image, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaFile, FaPencil, FaTrash } from 'react-icons/fa6';

function ListBanner() {
  const tema = useHookstate(TEMA)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true);
  const [isData, setData] = useState([]);
  const [valChoose, setValChoose] = useState("");
  const router = useRouter();
  const param = useParams<{ id: string }>()
  const [isOpenModalView, setOpenModalView] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [idDataStorage, setIdDataStorage] = useState('')
  const [isExtension, setExtension] = useState('')
  
 
  return (
    <Box pt={2}>
      <Box p={20}>
        <Anchor underline='never'>
          <Stack align='center' justify='center'>
            {[...Array(5)].map((_, index) => (
              <Paper radius={'md'} withBorder key={index} onClick={() => { setOpenDrawer(true) }
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
                    <Image radius={"xs"} src={"/assets/img/banner/Banner-1.png"} alt='' w={76} h={38.9} />
                  </ActionIcon>
                  <Flex direction={"column"}>
                    <Text c={"dark"} >Banner {index + 1}</Text>
                    <Text fz={"h6"} fw={"inherit"} c={"dark"}>Banner</Text>
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
              <Flex onClick={() => router.push("/banner/edit/[id]")} direction="column" align="center" justify="center" pb={20}>
                <Box>
                  <FaPencil size={30} color={WARNA.biruTua} />
                </Box>
                <Box>
                  <Text c={tema.get().utama} fz={{ base: 'sm', md: 'md'}}>Edit</Text>
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
      <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
        description='Apakah Anda yakin ingin menghapus banner?'
        onYes={(val) => { setOpenModal(false) }} />

      <LayoutModalViewFile opened={isOpenModalView} onClose={() => setOpenModalView(false)} file={idDataStorage} extension={isExtension} fitur='task' />
    </Box>
  );
}
  export default ListBanner;


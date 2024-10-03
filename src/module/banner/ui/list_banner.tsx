'use client'
import { LayoutDrawer, LayoutModalViewFile, TEMA, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Anchor, Box, Flex, Group, Image, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaFile, FaPencil, FaTrash } from 'react-icons/fa6';

function ListBanner({ onDeleted }: { onDeleted: (val: boolean) => void }) {
  const tema = useHookstate(TEMA)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true);
  const [isData, setData] = useState([]);
  const [valChoose, setValChoose] = useState("");
  const router = useRouter();
  const param = useParams<{ id: string }>()
  const [isOpenModalView, setOpenModalView] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [idDataStorage, setIdDataStorage] = useState('')
  const [isExtension, setExtension] = useState('')


  // async function onTrue(val: boolean) {
  //   if (val) {
  //     const response = await funDeleteBanner(param.id)
  //     if (response.success) {
  //       toast.success(response.message)
  //       onDeleted(true)
  //     } else {
  //       toast.error(response.message)
  //       onDeleted(false)
  //     }
  //   } else {
  //     onDeleted(false)
  //   }

  //   setOpen(false)
  // }
  return (
    <Box pt={20}>
      <Box p={20}>
        <Anchor underline='never'>
          <Stack align='center' justify='center'>
            {[...Array(5)].map((_, index) => (
              <Paper radius={'lg'} withBorder key={index} onClick={() => { setOpenDrawer(true) }
              }
                style={{
                  width: '100%',
                  maxWidth: 500,
                  height: 80,
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

      <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={<Text lineClamp={1}>{"Menu"}</Text>}
      >
        <SimpleGrid
          m={20}
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Box>
            <Anchor underline='never' onClick={() => router.push("/banner/edit/[id]")}>
              <Flex direction="column" align="center" justify="center">
                <FaPencil size={30} color={WARNA.biruTua} />
                <Text c={"dark"} mt={10} ta="center">Edit</Text>
              </Flex>
            </Anchor>
          </Box>
          <Box>
            <Anchor underline='never' onClick={() => {setOpenModalView(true)}}>
              <Flex direction="column" align="center" justify="center">
                <FaFile size={30} color={WARNA.biruTua} />
                <Text c={"dark"} mt={10} ta="center">Lihat File</Text>
              </Flex>
            </Anchor>
          </Box>
          <Box>
            <Anchor underline='never' onClick={() => {setOpen(true)}}>
              <Flex direction="column" align="center" justify="center">
                <FaTrash size={30} color={WARNA.biruTua} />
                <Text c={"dark"} mt={10} ta="center">Hapus</Text>
              </Flex>
            </Anchor>
          </Box>
        </SimpleGrid>
      </LayoutDrawer>

      <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
        description='Apakah Anda yakin ingin menghapus banner?'
        onYes={(val) => { setOpen(false) }} />
      
      <LayoutModalViewFile opened={isOpenModalView} onClose={() => setOpenModalView(false)} file={idDataStorage} extension={isExtension} fitur='task' />
    </Box>
  );
}

export default ListBanner;

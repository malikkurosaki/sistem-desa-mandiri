"use clent"
import { keyWibu, LayoutDrawer, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Button, Flex, Grid, Modal, Progress, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import _ from 'lodash';
import { useParams, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFolderClosed } from 'react-icons/fa6';
import { HiDocumentText } from 'react-icons/hi2';
import { IoAddCircle } from 'react-icons/io5';
import { useWibuRealtime } from 'wibu-realtime';
import { funCreateFolder, funUploadFileDocument } from '../lib/api_document';
import { globalRefreshDocument } from '../lib/val_document';

export default function DrawerMenuDocumentDivision() {
  const [openDrawerDocument, setOpenDrawerDocument] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const param = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const path = searchParams.get('path')
  const refresh = useHookstate(globalRefreshDocument)
  const openRef = useRef<() => void>(null)
  const tema = useHookstate(TEMA)
  const [loading, setLoading] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })
  const [bodyFolder, setBodyFolder] = useState({
    name: '',
    path: (path == undefined || path == '' || path == null) ? 'home' : path,
    idDivision: param.id
  })

  async function onCreateFolder() {
    try {
      setLoadingCreate(true)
      const res = await funCreateFolder(bodyFolder)
      if (!res.success) {
        toast.error(res.message)
      } else {
        setDataRealtime([{
          category: "division-document",
          id: path,
        }])
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat folder baru, coba lagi nanti");
    } finally {
      setLoadingCreate(false)
      refresh.set(true)
      setOpenModal(false)
      setOpenDrawerDocument(false)
    }

  }

  async function onUploadFile(data: any) {
    try {
      setLoading(true)
      const fd = new FormData()
      fd.append(`file`, data)
      fd.append("data", JSON.stringify({
        idPath: (path == undefined || path == '' || path == null) ? 'home' : path,
        idDivision: param.id
      }))
      setOpenModal(false)
      // setOpenDrawerDocument(false)
      const res = await funUploadFileDocument(fd)

      if (!res.success) {
        toast.error(res.message)
      } else {
        setDataRealtime([{
          category: "division-document",
          id: path,
        }])
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
      toast.error("Gagal upload file, coba lagi nanti");
      setLoading(false)
    }
    refresh.set(true)
    setOpenDrawerDocument(false)
  }


  return (
    <Box>
      {loading ? (
        <Box >
          <Progress mt={"10vh"} size="lg" value={100} animated />
          <Text ta={"center"}>Loading...</Text>
        </Box>
      ) :
        (
          <Stack pt={10}>
            <SimpleGrid
              cols={{ base: 2, sm: 3, lg: 3 }}
              onClick={() => setOpenDrawerDocument(true)}
            >
              <Flex justify={'center'} align={'center'} direction={'column'} >
                <Box>
                  <IoAddCircle size={30} color={tema.get().utama} />
                </Box>
                <Box >
                  <Text c={tema.get().utama}>Tambah Dokumen</Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Stack>
        )
      }

      <LayoutDrawer opened={openDrawerDocument} onClose={() => setOpenDrawerDocument(false)} title={''}>
        {loading ? (
          <Box >
            <Progress mt={"10vh"} size="lg" value={100} animated />
            <Text ta={"center"}>Loading...</Text>
          </Box>
        ) :
          (
            <SimpleGrid
              cols={{ base: 2, sm: 2, lg: 2 }}
              onClick={() => setOpenDrawerDocument(true)}
            >
              <Flex onClick={() => setOpenModal(true)} justify={'center'} align={'center'} direction={'column'} mb={20} >
                <Box>
                  <ActionIcon variant="filled" color="#DFE8EA" size={61} radius="xl" aria-label="Settings">
                    <FaFolderClosed size={40} color={tema.get().utama} />
                  </ActionIcon>
                </Box>
                <Box mt={10}>
                  <Text c={tema.get().utama}>Membuat Folder</Text>
                </Box>
              </Flex>
              <Dropzone
                openRef={openRef}
                onDrop={async (files) => {
                  if (!files || _.isEmpty(files))
                    return toast.error('Tidak ada file yang dipilih')
                  onUploadFile(files[0])
                }}
                activateOnClick={false}
                maxSize={3 * 1024 ** 2}
                accept={['text/csv', 'image/png', 'image/jpeg', 'image/heic', 'application/pdf']}
                onReject={(files) => {
                  refresh.set(true)
                  setOpenModal(false)
                  setOpenDrawerDocument(false)
                  toast.error('File yang diizinkan: .csv, .png, .jpg, .heic, .pdf dengan ukuran maksimal 3 MB')
                }}
              >
                <Flex justify={'center'} align={'center'} direction={'column'} mb={20} onClick={() => openRef.current?.()}>
                  <Box>
                    <ActionIcon variant="filled" color="#DFE8EA" size={61} radius="xl" aria-label="Settings">
                      <HiDocumentText size={40} color={tema.get().utama} />
                    </ActionIcon>
                  </Box>
                  <Box mt={10}>
                    <Text c={tema.get().utama}>Upload File</Text>
                  </Box>
                </Flex>
              </Dropzone>

            </SimpleGrid>
          )
        }
      </LayoutDrawer>



      <Modal styles={{
        body: {
          borderRadius: 20
        },
        content: {
          borderRadius: 20,
          border: `2px solid ${"#828AFC"}`
        }
      }} opened={openModal} onClose={() => setOpenModal(false)} centered withCloseButton={false}>
        <Box p={20}>
          <Text ta={"center"} fw={"bold"}>Buat Folder Baru</Text>
          <Box mt={20} mb={20}>
            <TextInput
              styles={{
                input: {
                  color: tema.get().utama,
                  borderRadius: '#828AFC',
                  borderColor: '#828AFC',
                },
              }}
              size="md"
              radius={10}
              placeholder="Buat Folder Baru"
              value={bodyFolder.name}
              onChange={(e) => setBodyFolder({ ...bodyFolder, name: e.target.value })}
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color='#969494' onClick={() => setOpenModal(false)}>Batalkan</Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button loading={loadingCreate} variant="subtle" fullWidth color={tema.get().utama} onClick={() => onCreateFolder()}>Membuat</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

"use clent"
import { LayoutDrawer, WARNA } from '@/module/_global';
import { ActionIcon, Box, Button, Divider, Flex, Grid, Modal, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFolderClosed, FaRegImage } from 'react-icons/fa6';
import { HiDocumentText } from 'react-icons/hi2';
import { IoAddCircle, IoDocumentText } from 'react-icons/io5';
import { funCreateFolder } from '../lib/api_document';
import { useHookstate } from '@hookstate/core';
import { globalRefreshDocument } from '../lib/val_document';

export default function DrawerMenuDocumentDivision() {
  const [openDrawerDocument, setOpenDrawerDocument] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const path = searchParams.get('path')
  const refresh = useHookstate(globalRefreshDocument)

  const [bodyFolder, setBodyFolder] = useState({
    name: '',
    path: (path == undefined || path == '' || path == null) ? 'home' : path,
    idDivision: param.id
  })

  async function onCreateFolder() {
    try {
      const res = await funCreateFolder(bodyFolder)
      if (res.success) {
        refresh.set(true)
        setOpenModal(false)
        setOpenDrawerDocument(false)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal membuat folder baru, coba lagi nanti");
    }
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 2, sm: 3, lg: 3 }}
          onClick={() => setOpenDrawerDocument(true)}
        >
          <Flex justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box >
              <Text c={WARNA.biruTua}>Tambah Dokumen</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer opened={openDrawerDocument} onClose={() => setOpenDrawerDocument(false)} title={''} size='lg' >
        <SimpleGrid
          cols={{ base: 2, sm: 2, lg: 2 }}
          onClick={() => setOpenDrawerDocument(true)}
        >
          <Flex onClick={() => setOpenModal(true)} justify={'center'} align={'center'} direction={'column'} mb={20} >
            <Box>
              <ActionIcon variant="filled" color="#DFE8EA" size={61} radius="xl" aria-label="Settings">
                <FaFolderClosed size={40} color={WARNA.biruTua} />
              </ActionIcon>
            </Box>
            <Box mt={10}>
              <Text c={WARNA.biruTua}>Membuat Folder</Text>
            </Box>
          </Flex>
          <Flex justify={'center'} align={'center'} direction={'column'} mb={20}>
            <Box>
              <ActionIcon variant="filled" color="#DFE8EA" size={61} radius="xl" aria-label="Settings">
                <HiDocumentText size={40} color={WARNA.biruTua} />
              </ActionIcon>
            </Box>
            <Box mt={10}>
              <Text c={WARNA.biruTua}>Upload Dokumen</Text>
            </Box>
          </Flex>
          <Flex justify={'center'} align={'center'} direction={'column'} mb={20} >
            <Box>
              <ActionIcon variant="filled" color="#DFE8EA" size={61} radius="xl" aria-label="Settings">
                <FaRegImage size={40} color={WARNA.biruTua} />
              </ActionIcon>
            </Box>
            <Box mt={10}>
              <Text c={WARNA.biruTua}>Upload Foto</Text>
            </Box>
          </Flex>
        </SimpleGrid>
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
                  color: WARNA.biruTua,
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
              <Button variant="subtle" fullWidth color={WARNA.biruTua} onClick={() => onCreateFolder()}>Membuat</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

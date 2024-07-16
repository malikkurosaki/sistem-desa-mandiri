"use clent"
import { LayoutDrawer, WARNA } from '@/module/_global';
import { ActionIcon, Box, Button, Divider, Flex, Grid, Modal, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFolderClosed, FaRegImage } from 'react-icons/fa6';
import { HiDocumentText } from 'react-icons/hi2';
import { IoAddCircle, IoDocumentText } from 'react-icons/io5';

export default function DrawerMenuDocumentDivision() {
  const [openDrawerDocument, setOpenDrawerDocument] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  function onCreate(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
    }
    setOpenDrawerDocument(false)
    setOpenModal(false)
    router.push('/document')
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
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color='#969494' onClick={() => setOpenModal(false)}>Batalkan</Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color={WARNA.biruTua} onClick={(val) => onCreate(true)}>Membuat</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}

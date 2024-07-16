"use client"
import { WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoAddCircle } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';

export default function DrawerDetailEvent() {
  const router = useRouter()
  const [isModal, setModal] = useState(false)

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data dihapus");
    }
    setModal(false)
  }
  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Flex  onClick={() => setModal(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <MdDelete size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text ta={"center"} c={WARNA.biruTua}>Hapus</Text>
            </Box>
          </Flex>
          <Flex onClick={() => router.push('/calender/update')}  justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <MdEdit size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Edit</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menghapus data?"
        onYes={(val) => { onTrue(val) }} />
    </Box>
  );
}

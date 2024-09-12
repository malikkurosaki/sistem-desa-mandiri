import { WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Flex, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { IoAddCircle, IoColorPalette } from 'react-icons/io5';

export default function DrawerPaletEditEndDefault() {
  const router = useRouter()
  const [isModal, setModal] = useState(false)

  function onCLose(val: boolean) {
    setModal(false)
  }
  return (
    <Box>
      <SimpleGrid
        cols={{ base: 2, sm: 3, lg: 3 }}
      >
        <Flex justify={'center'} align={'center'} direction={'column'}
          onClick={() => setModal(true)}
        >
          <Box>
            <IoColorPalette size={30} color={WARNA.biruTua} />
          </Box>
          <Box>
            <Text ta={'center'} c={WARNA.biruTua}>Default Warna</Text>
          </Box>
        </Flex>
        <Flex justify={'center'} align={'center'} direction={'column'}
          onClick={() => router.push('/color-palette/update/1')}
        >
          <Box>
            <FaPencil size={30} color={WARNA.biruTua} />
          </Box>
          <Box>
            <Text ta={'center'} c={WARNA.biruTua}>Edit Palet</Text>
          </Box>
        </Flex>
      </SimpleGrid>

      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah warna Aplikasi?"
        onYes={(val) => { onCLose(val) }} />
    </Box>
  );
}


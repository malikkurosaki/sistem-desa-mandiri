import { TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { IoAddCircle, IoColorPalette } from 'react-icons/io5';

export default function DrawerPaletEditEndDefault() {
  const router = useRouter()
  const [isModal, setModal] = useState(false)
  const tema = useHookstate(TEMA)

  function onCLose(val: boolean) {
    setModal(false)
    // tema.set({
    //   ...tema.get(),
    //   utama:'#000'
    // })
    // router.refresh()
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
            <IoColorPalette size={30} color={tema.get().utama} />
          </Box>
          <Box>
            <Text ta={'center'} c={tema.get().utama}>Gunakan Tema</Text>
          </Box>
        </Flex>
        <Flex justify={'center'} align={'center'} direction={'column'}
          onClick={() => router.push('/color-palette/update/1')}
        >
          <Box>
            <FaPencil size={30} color={tema.get().utama} />
          </Box>
          <Box>
            <Text ta={'center'} c={tema.get().utama}>Edit Tema</Text>
          </Box>
        </Flex>
      </SimpleGrid>

      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah Tema Aplikasi?"
        onYes={(val) => { onCLose(val) }} />
    </Box>
  );
}


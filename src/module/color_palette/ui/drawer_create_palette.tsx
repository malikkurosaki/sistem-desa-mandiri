import { WARNA } from '@/module/_global';
import { Box, Flex, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoAddCircle } from 'react-icons/io5';

export default function DrawerCreatePalette() {
  const router = useRouter()
  return (
    <Box>
      <SimpleGrid
        cols={{ base: 2, sm: 3, lg: 3 }}
      >
        <Flex justify={'center'} align={'center'} direction={'column'}
        onClick={() => router.push('/color-palette/create')}
        >
          <Box>
            <IoAddCircle size={30} color={WARNA.biruTua} />
          </Box>
          <Box>
            <Text ta={'center'} c={WARNA.biruTua}>Tambah Palet</Text>
          </Box>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}

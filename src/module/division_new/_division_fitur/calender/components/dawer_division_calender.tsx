import { WARNA } from '@/module/_global';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import React from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { IoAddCircle } from 'react-icons/io5';

export default function DawerDivisionCalender() {
  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 2, sm: 3, lg: 3 }}
        >
          <Flex onClick={() => window.location.href = "/calender/create"} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text ta={"center"} c={WARNA.biruTua}>Tambah Kalender</Text>
            </Box>
          </Flex>
          <Flex onClick={() => window.location.href = "/calender/history"} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <AiOutlineFileSearch size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Riwayat</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}


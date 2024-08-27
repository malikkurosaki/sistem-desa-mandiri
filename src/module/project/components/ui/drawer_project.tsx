import { WARNA } from '@/module/_global';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { HiOutlineFilter } from 'react-icons/hi';
import { IoAddCircle } from 'react-icons/io5';

export default function DrawerProject() {
  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 2, sm: 2, lg: 3 }}
        >
          <Flex onClick={() => window.location.href = "/project/create"} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Tambah Kegiatan</Text>
            </Box>
          </Flex>
          <Flex onClick={() => window.location.href = "/project?cat=filter"} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <HiOutlineFilter size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Filter</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}

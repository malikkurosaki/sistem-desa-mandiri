import { globalRole, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { HiOutlineFilter } from 'react-icons/hi';
import { IoAddCircle } from 'react-icons/io5';

export default function MenuDrawerProject() {
  const roleLogin = useHookstate(globalRole)
  const searchParams = useSearchParams()
  const group = searchParams.get('group')

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
          {
            roleLogin.get() == "supadmin" &&
            <Flex onClick={() => window.location.href = "/project?page=filter&group=" + group} justify={'center'} align={'center'} direction={'column'} >
              <Box>
                <HiOutlineFilter size={30} color={WARNA.biruTua} />
              </Box>
              <Box>
                <Text c={WARNA.biruTua}>Filter</Text>
              </Box>
            </Flex>
          }
        </SimpleGrid>
      </Stack>
    </Box>
  );
}


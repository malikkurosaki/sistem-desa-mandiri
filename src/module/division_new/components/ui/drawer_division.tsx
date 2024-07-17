"use client"
import { WARNA } from '@/module/_global';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiOutlineFilter } from 'react-icons/hi';
import { IoAddCircle } from 'react-icons/io5';
import { TbReportAnalytics } from "react-icons/tb";

export default function DrawerDivision() {
  const router = useRouter()
  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Flex onClick={() => router.push('/division/create')} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <IoAddCircle size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Tambah Divisi</Text>
            </Box>
          </Flex>
          <Flex onClick={() => {
            router.push('/division?page=filter')
          }} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <HiOutlineFilter size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Filter</Text>
            </Box>
          </Flex>
          <Flex onClick={() => {
            router.push('/division?page=report')
          }} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <TbReportAnalytics size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Report</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}

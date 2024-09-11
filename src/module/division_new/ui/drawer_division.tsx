"use client"
import { globalRole, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { HiOutlineFilter } from 'react-icons/hi';
import { IoAddCircle } from 'react-icons/io5';
import { TbReportAnalytics } from "react-icons/tb";

export default function DrawerDivision() {
  const router = useRouter()
  const roleLogin = useHookstate(globalRole)
  const searchParams = useSearchParams()
  const group = searchParams.get('group')

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
              <Text c={WARNA.biruTua} ta={"center"}>Tambah Divisi</Text>
            </Box>
          </Flex>
          {
            roleLogin.get() == "supadmin" &&
            <Flex onClick={() => {
              router.push('/division?page=filter&group=' + group)
            }} justify={'center'} align={'center'} direction={'column'} >
              <Box>
                <HiOutlineFilter size={30} color={WARNA.biruTua} />
              </Box>
              <Box>
                <Text c={WARNA.biruTua}>Filter</Text>
              </Box>
            </Flex>
          }

          {
            (roleLogin.get() == "supadmin" || roleLogin.get() == "cosupadmin") &&
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
          }
        </SimpleGrid>
      </Stack>
    </Box>
  );
}

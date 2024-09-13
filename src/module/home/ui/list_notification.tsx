"use client"
import { TEMA, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Center, Grid, Group, Spoiler, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBell } from 'react-icons/fa6';

const dataNotification = [
  {
    id: 1,
    title: 'Rapat Kamis Kamis Kamis Kamis Kamis Kamis Kamis Kamis ',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 2,
    title: 'Rapat Jumat',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 3,
    title: 'Rapat Senin',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 4,
    title: 'Rapat Selasa',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
]

export default function ListNotification() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 369px)');
  const tema = useHookstate(TEMA)
  return (
    <Box>
      {dataNotification.map((v, i) => {
        return (
          <Box key={i} my={15}>
            <Box style={{
              border: `1px solid ${tema.get().utama}`,
              padding: 20,
              borderRadius: 15
            }} >
              <Group align='center'>
                <ActionIcon variant="light" bg={tema.get().utama} size={35} radius={100} aria-label="icon">
                  <FaBell size={20} color='white' />
                </ActionIcon>
                <Box
                  w={{
                    base: isMobile ? 200 : 240,
                    xl: 380
                }}
                >
                <Text fw={'bold'} fz={isMobile ? 16 : 18} lineClamp={1}>{v.title}</Text>
                </Box>
              </Group>
              <Spoiler maxHeight={60} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                <Text mt={10} fz={15}>{v.description}</Text>
              </Spoiler>
            </Box>
          </Box>
        )
      })}
    </Box>
  );
}


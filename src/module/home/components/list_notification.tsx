"use client"
import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Grid, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaBell } from 'react-icons/fa6';

const dataNotification = [
  {
    id: 1,
    title: 'Rapat Kamis',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 2,
    title: 'Rapat Jumat',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 3,
    title: 'Rapat Senin',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 4,
    title: 'Rapat Selasa',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file.',
  },
]

export default function ListNotification() {
  const router = useRouter()
  return (
    <Box>
      {dataNotification.map((v, i) => {
        return (
          <Box key={i} my={15}>
            <Box style={{
              border: `1px solid ${WARNA.borderOrange}`,
              padding: 20,
              borderRadius: 15
            }} >
              <Group align='center'>
                <ActionIcon variant="light" bg={WARNA.biruTua} size={35} radius={100} aria-label="icon">
                  <FaBell size={20} color='white' />
                </ActionIcon>
                <Text fw={'bold'} fz={18}>{v.title}</Text>
              </Group>
              <Text mt={10} fz={15}>{v.description}</Text>
            </Box>
          </Box>
        )
      })}
    </Box>
  );
}


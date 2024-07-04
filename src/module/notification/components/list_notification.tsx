"use client"
import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Grid, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiUser } from 'react-icons/hi2';

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
          <Grid style={{
            border: `1px solid ${WARNA.borderOrange}`,
            padding: 15,
            borderRadius: 15
          }} gutter={1} key={i} mb={"sm"}>
            <Grid.Col span={3} pl={'xs'}>
              <ActionIcon variant="light" bg={WARNA.biruTua} size={50} radius={100} aria-label="icon">
                <HiUser size={30} color='white' />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={9}>
              <Box>
                <Text fw={'bold'} fz={18}>{v.title}</Text>
                <Text fz={15}>{v.description}</Text>
              </Box>
            </Grid.Col>
          </Grid>
        )
      })}
    </Box>
  );
}


"use client"
import { WARNA } from '@/module/_global';
import { Box, Button, Checkbox } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';

const dataUlangi = [
  {
    id: 1,
    name: 'Acara 1 Kali'
  },
  {
    id: 2,
    name: 'Hari Kerja (Sen - Jum)'
  },
  {
    id: 3,
    name: 'Mingguan'
  },
  {
    id: 4,
    name: 'Bulanan'
  },
  {
    id: 5,
    name: 'Tahunan'
  },
]

export default function ListUlangiEvent() {
  const router = useRouter()
  return (
    <Box>
      {dataUlangi.map((v, i) => {
        return (
          <Box key={i} mb={20}>
            <Box style={{
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
              padding: 20
            }}
            >
              <Checkbox
                label={v.name}
                color="teal"
                radius="xl"
              />
            </Box>
          </Box>
        )
      })}
      <Box mt={"xl"}>
        <Button
          c={"white"}
          bg={WARNA.biruTua}
          size="lg"
          radius={30}
          fullWidth
          onClick={() => router.push(``)}
        >
          Simpan
        </Button>
      </Box>
    </Box>
  );
}


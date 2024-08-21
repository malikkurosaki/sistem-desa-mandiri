'use client'
import { WARNA } from '@/module/_global';
import { Box, Text } from '@mantine/core';
import React from 'react';

export default function ListFileDetailProject() {
  return (
    <>
      <Box pt={20}>
        <Text fw={'bold'} c={WARNA.biruTua}>File</Text>
        <Box bg={"white"} style={{
          borderRadius: 10,
          border: `1px solid ${"#D6D8F6"}`,
          padding: 20
        }}>
          <Text>Tidak ada file</Text>
        </Box>
      </Box>
    </>
  );
}


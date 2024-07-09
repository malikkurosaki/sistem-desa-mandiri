import { WARNA } from '@/module/_global';
import { Box, Group, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { AiOutlineFileSync } from "react-icons/ai";

export default function ResultsDateAndTask() {
  return (
    <Box pt={20}>
      <Text fw={'bold'} c={WARNA.biruTua}>Tanggal & Tugas</Text>
      <Box bg={"white"} style={{
        borderRadius: 10,
        border: `1px solid ${"#D6D8F6"}`,
        padding: 20
      }}>
        <Box style={{
          borderRadius: 10,
          border: `1px solid ${"#D6D8F6"}`,
          padding: 10
        }}>
          <Group>
            <AiOutlineFileSync size={25} />
            <Text>Proyek Laporan Permasyarakatan</Text>
          </Group>
        </Box>
        <Box>
          <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
            <Box>
              <Text>Tanggal Mulai</Text>
              <Group
                justify="center"
                bg={"white"}
                h={45}
                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
              >
                <Text>16 Juni 2024</Text>
              </Group>
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Tanggal Berakhir</Text>
              <Group
                justify="center"
                bg={"white"}
                h={45}
                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
              >
                <Text>20 Juni 2024</Text>
              </Group>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}


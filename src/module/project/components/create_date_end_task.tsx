"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Group, Input, SimpleGrid, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import moment from "moment";
import { IoIosArrowDropright } from "react-icons/io";

export default function ViewDateEndTask() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <Box>
      <LayoutNavbarNew back="/project/create" title={"Tanggal Tugas"} menu />
      <Box p={20}>
        <Group
          justify="center"
          bg={"white"}
          py={20}
          style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
        >
          <DatePicker
            styles={{}}
            type="range"
            value={value}
            onChange={setValue}
            size="md"
            c={WARNA.biruTua}
          />
        </Group>
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
          <Box>
            <Text>Tanggal Mulai</Text>
            <Group
              justify="center"
              bg={"white"}
              h={45}
              style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
            >
              <Text>{value[0] ? `${value[0].toLocaleDateString()}` : ""}</Text>
            </Group>
          </Box>
          <Box>
            <Text>Tanggal Berakhir</Text>
            <Group
              justify="center"
              bg={"white"}
              h={45}
              style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
            >
              <Text>{value[1] ? `${value[1].toLocaleDateString()}` : ""}</Text>
            </Group>
          </Box>
        </SimpleGrid>
        <Stack pt={15}>
          <Input
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Input Nama Tahapan"
            size="md"
          />
          <Box >
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text>Tambah Anggota</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
        </Stack>
        <Box pt={30}>
          <Group justify="space-between">
            <Text>Anggota Terpilih</Text>
            <Text>Total 10 Anggota</Text>
          </Group>
          <Box pt={20}>
            <Box mb={20}>
              <Box style={{
                border: `1px solid ${'#C7D6E8'}`
              }} p={20}>
                <Text>Divisi Kerohanian</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

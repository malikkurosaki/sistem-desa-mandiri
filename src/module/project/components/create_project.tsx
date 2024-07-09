'use client'
import { LayoutNavbarNew } from "@/module/_global";
import { Box, Group, Input, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";

export default function CreateProject() {
  const router = useRouter()
  return (
    <Box>
      <LayoutNavbarNew back="/project" title="tambah proyek" menu />
      <Box p={20}>
        <Stack>
          <Input
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Nama Proyek"
            size="md"
          />
          <Box onClick={() => router.push('/project/create?page=task')}>
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text>Tambah Tanggal & Tugas</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
          <Group
            justify="space-between"
            p={10}
            style={{
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
            }}
          >
            <Text>Upload File</Text>
            <IoIosArrowDropright size={25} />
          </Group>
        </Stack>
      </Box>
    </Box>
  );
}

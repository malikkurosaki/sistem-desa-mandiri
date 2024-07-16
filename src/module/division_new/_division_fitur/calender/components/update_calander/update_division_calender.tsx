"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Button, Group, Input, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import React, { useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';

export default function UpdateDivisionCalender() {
  const [isModal, setModal] = useState(false)

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
    }
    setModal(false)
  }
  const [value, setValue] = useState<Date | null>(null);
  const router = useRouter()
  return (
    <Box>
      <LayoutNavbarNew back="/calender" title="Edit kalender" menu />
      <Box p={20}>
        <Stack>
          <TextInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            size="md"
            placeholder="Event Nama"
            label="Event Nama"
          />
          <DateInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            size="md"
            value={value}
            onChange={setValue}
            placeholder="Input Tanggal"
            label="Tanggal"
          />
          <SimpleGrid
            cols={{ base: 2, sm: 2, lg: 2 }}
          >
            <TimeInput
              styles={{
                input: {
                  border: `1px solid ${"#D6D8F6"}`,
                  borderRadius: 10,
                },
              }}
              size="md"
              label="Waktu Awal"
            />
            <TimeInput
              styles={{
                input: {
                  border: `1px solid ${"#D6D8F6"}`,
                  borderRadius: 10,
                },
              }}
              size="md"
              label="Waktu Akhir"
            />
          </SimpleGrid>
          <TextInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            size="md"
            placeholder="Link Meet"
            label="Link Meet"
          />
          <Box mt={5} onClick={() => router.push('/calender/update?page=update-ulangi-event')}>
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text>Ulangi Event</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
          <Box mt={5} onClick={() => router.push('/calender/update?page=update-user-calender')}>
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
          <Textarea styles={{
            input: {
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
            },
          }}
            size="md" placeholder='Deskripsi' label="Deskripsi" />
          <Box mt={"xl"}>
            <Button
              c={"white"}
              bg={WARNA.biruTua}
              size="lg"
              radius={30}
              fullWidth
              onClick={() => setModal(true)}
            >
              Simpan
            </Button>
          </Box>
        </Stack>
      </Box>
      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => { onTrue(val) }} />
    </Box>
  );
}


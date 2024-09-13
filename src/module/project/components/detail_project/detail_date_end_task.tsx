"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import moment from "moment";
import { IoIosArrowDropright } from "react-icons/io";
import { useRouter } from "next/navigation";

const dataTugas = [
  {
    id: 1,
    name: "Iqbal Ramadan",
    image: "https://i.pravatar.cc/1000?img=5",
    email: "iqbal.ramadan@gmail.com",
  },
  {
    id: 2,
    name: "Doni Setiawan",
    image: "https://i.pravatar.cc/1000?img=10",
    email: "doni.setiawan@gmail.com",
  },
  {
    id: 3,
    name: "Rangga Agung",
    image: "https://i.pravatar.cc/1000?img=51",
    email: "rangga.agung@gmail.com",
  },
  {
    id: 4,
    name: "Ramadan Sananta",
    image: "https://i.pravatar.cc/1000?img=15",
    email: "ramadan@gmail.com",
  },
  {
    id: 5,
    name: "Imam Baroni",
    image: "https://i.pravatar.cc/1000?img=22",
    email: "imam.baroni@gmail.com",
  },
];

export default function DetailDateEndTask({ kategori }: { kategori: string }) {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const router = useRouter()
  return (
    <Box>
      <LayoutNavbarNew back="" title={"Tanggal Tugas"} menu />
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
            <Text c={WARNA.biruTua}>Tanggal Berakhir</Text>
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
          <Box onClick={() => router.push(`/${kategori}/update/1?page=detail-create-user`)}>
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text c={WARNA.biruTua}>Tambah Anggota</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
        </Stack>
        <Box pt={30}>
          <Group justify="space-between">
            <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
            <Text c={WARNA.biruTua}>Total 10 Anggota</Text>
          </Group>
          <Box pt={10}>
            <Box mb={20}>
              <Box
                style={{
                  border: `1px solid ${"#C7D6E8"}`,
                  borderRadius: 10,
                }}
                px={20}
                py={10}
              >
                <Text c={WARNA.biruTua} fw={"bold"}>
                  Divisi Kerohanian
                </Text>
                {dataTugas.map((v, i) => {
                  return (
                    <Flex
                      justify={"space-between"}
                      align={"center"}
                      mt={20}
                      key={i}
                    >
                      <Group>
                        <Avatar src={v.image} alt="it's me" size="lg" />
                        <Box>
                          <Text c={WARNA.biruTua} fw={"bold"}>
                            {v.name}
                          </Text>
                          <Text c={"#5A687D"} fz={14}>
                            {v.email}
                          </Text>
                        </Box>
                      </Group>
                      <Text c={WARNA.biruTua} fw={"bold"}>
                        Anggota
                      </Text>
                    </Flex>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={"xl"}>
          <Button
            c={"white"}
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => router.push(`/${kategori}/update/1?tugas=yes`)}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


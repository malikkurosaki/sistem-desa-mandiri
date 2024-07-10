"use client"
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
const DateUsers = [
  {
    id: 1,
    name: "Iqbal Ramadan",
    image: "https://i.pravatar.cc/1000?img=5",
  },
  {
    id: 2,
    name: "Doni Setiawan",
    image: "https://i.pravatar.cc/1000?img=10",
  },
  {
    id: 3,
    name: "Rangga Agung",
    image: "https://i.pravatar.cc/1000?img=51",
  },
  {
    id: 4,
    name: "Ramadan Sananta",
    image: "https://i.pravatar.cc/1000?img=15",
  },
  {
    id: 5,
    name: "Imam Baroni",
    image: "https://i.pravatar.cc/1000?img=22",
  },
];

export default function CreateUsersProject() {
  const router = useRouter()
  return (
    <Box>
      <LayoutNavbarNew
        back="/project/create?page=task"
        title="Pilih Anggota"
        menu
      />
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder="Pencarian"
        />
        <Flex justify={"space-between"} mt={20}>
          <Text c={WARNA.biruTua} fw={"bold"}>
            Pilih Semua Divisi
          </Text>
          <Checkbox defaultChecked color="teal" size="md" />
        </Flex>
        <Flex justify={"space-between"} mt={20}>
          <Text c={WARNA.biruTua} fw={"bold"}>
            Divisi Kerohanian
          </Text>
          <Anchor>Pilih Semua</Anchor>
        </Flex>
        <Box mt={15}>
          {DateUsers.map((v, i) => {
            return (
              <Box mb={15} key={i}>
                <Flex justify={"space-between"} align={"center"}>
                  <Group>
                    <Avatar src={v.image} alt="it's me" size="lg" />
                    <Text c={WARNA.biruTua} fw={"bold"}>
                      {v.name}
                    </Text>
                  </Group>
                  <Checkbox defaultChecked color="teal" size="md" />
                </Flex>
                <Divider my={"md"} />
              </Box>
            );
          })}
        </Box>
        <Box mt={"xl"}>
          <Button
            c={"white"}
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => router.push('/project/create?page=task')}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Checkbox,
  Flex,
  Grid,
  Group,
  Progress,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React from "react";
import { HiMiniPresentationChartBar } from "react-icons/hi2";
import { IoIosArrowDropright } from "react-icons/io";
import ResultsDateAndTask from "../results_date-and_task";
import ResultsFile from "../results_file";
import { AiOutlineFileSync } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { LuClipboardEdit } from "react-icons/lu";

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

export default function DetailProject() {
  const router = useRouter();
  return (
    <Box>
      <LayoutNavbarNew
        back="/project"
        title="Proyek Desa Maju"
        menu={
          <ActionIcon
            variant="light"
            bg={WARNA.bgIcon}
            size="lg"
            radius="lg"
            aria-label="Settings"
            onClick={() => router.push("/project/update/1")}
          >
            <LuClipboardEdit size={20} color="white" />
          </ActionIcon>
        }
      />
      <Box p={20}>
        <Box mt={10}>
          <Box
            p={20}
            bg={"#DCEED8"}
            style={{
              borderRadius: 10,
            }}
          >
            <Grid gutter={"lg"}>
              <Grid.Col span={3}>
                <ActionIcon
                  variant="gradient"
                  size={68}
                  aria-label="Gradient action icon"
                  radius={100}
                  gradient={{ from: "#DFDA7C", to: "#F2AF46", deg: 174 }}
                >
                  <HiMiniPresentationChartBar size={35} color={WARNA.biruTua} />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={9}>
                <Box>
                  <Text>Kemajuan Proyek 60%</Text>
                  <Progress
                    style={{
                      border: `1px solid ${"#BDBDBD"}`,
                    }}
                    w={"100%"}
                    color="#FCAA4B"
                    radius="md"
                    size="xl"
                    value={60}
                  />
                  <Text>18 Juni 2024</Text>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
        <Box pt={20}>
          <Text fw={"bold"} c={WARNA.biruTua}>
            Tanggal & Tugas
          </Text>
          <Box
            bg={"white"}
            style={{
              borderRadius: 10,
              border: `1px solid ${"#D6D8F6"}`,
              padding: 20,
            }}
          >
            <Grid>
              <Grid.Col span={"auto"}>
                <Center>
                  <Checkbox color="teal" size="md" />
                </Center>
              </Grid.Col>
              <Grid.Col span={10}>
                <Box
                  style={{
                    borderRadius: 10,
                    border: `1px solid ${"#D6D8F6"}`,
                    padding: 10,
                  }}
                >
                  <Group>
                    <AiOutlineFileSync size={25} />
                    <Text>Laporan Permasyarakatan</Text>
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
                        style={{
                          borderRadius: 10,
                          border: `1px solid ${"#D6D8F6"}`,
                        }}
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
                        style={{
                          borderRadius: 10,
                          border: `1px solid ${"#D6D8F6"}`,
                        }}
                      >
                        <Text>20 Juni 2024</Text>
                      </Group>
                    </Box>
                  </SimpleGrid>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
        <ResultsFile />
        <Box pt={20}>
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
      </Box>
    </Box>
  );
}

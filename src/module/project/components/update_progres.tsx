'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Button, Center, Checkbox, Flex, Grid, Group, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlineFileSync } from 'react-icons/ai';
import { BsFiletypeCsv } from 'react-icons/bs';
import { IoIosArrowDropright } from 'react-icons/io';

export default function UpdateProgres() {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box>
      <LayoutNavbarNew back='' title="Progres Tugas" menu />
      <Box p={20}>
        <Box mb={20}>
          <Group
            justify="space-between"
            bg={'white'}
            p={10}
            style={{
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
            }}
            onClick={() => setOpenDrawer(true)}
          >
            <Text>Upload File</Text>
            <IoIosArrowDropright size={25} />
          </Group>
        </Box>
        <Text fw={'bold'} c={WARNA.biruTua}>Tanggal & Tugas</Text>
        <Box bg={"white"} style={{
          borderRadius: 10,
          border: `1px solid ${"#D6D8F6"}`,
          padding: 20
        }}>
          <Grid>
            <Grid.Col span={'auto'}>
              <Center>
                <Checkbox color="teal" size="md" />
              </Center>
            </Grid.Col>
            <Grid.Col span={10}>
              <Box style={{
                borderRadius: 10,
                border: `1px solid ${"#D6D8F6"}`,
                padding: 10
              }}>
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
            </Grid.Col>
          </Grid>
        </Box>
        <Box pt={20}>
          <Text fw={'bold'} c={WARNA.biruTua}>File</Text>
          <Box bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 20
          }}>
            <Box style={{
              borderRadius: 10,
              border: `1px solid ${"#D6D8F6"}`,
              padding: 10
            }} mb={10}>
              <Group>
                <BsFiletypeCsv size={25} />
                <Text>Proyek Laporan Permasyarakatan</Text>
              </Group>
            </Box>
            <Box style={{
              borderRadius: 10,
              border: `1px solid ${"#D6D8F6"}`,
              padding: 10
            }}>
              <Group>
                <BsFiletypeCsv size={25} />
                <Text>Proyek Laporan Permasyarakatan</Text>
              </Group>
            </Box>
          </Box>
        </Box>
        <Box mt="xl">
          <Button color="white" bg={WARNA.biruTua} size="lg" radius={30} fullWidth onClick={() => router.push('/project/1')}>
            Simpan
          </Button>
        </Box>
      </Box>
      <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={"Pilih File"}
      >
        <Flex justify={"space-around"}>
          <Box onClick={() => ""}>
            <Box
              bg={"#DCEED8"}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Center>
                <BsFiletypeCsv size={40} />
              </Center>
            </Box>
            <Text mt={10} ta={"center"}>
              Pilih file
            </Text>
            <Text ta={"center"}>diperangkat</Text>
          </Box>
          <Box onClick={() => router.push("/project/update-detail?page=upload-progres")}>
            <Box
              bg={"#DCEED8"}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Center>
                <BsFiletypeCsv size={40} />
              </Center>
            </Box>
            <Text mt={10} ta={"center"}>
              Pilih file yang
            </Text>
            <Text ta={"center"}>sudah ada</Text>
          </Box>
        </Flex>
      </LayoutDrawer>
    </Box>
  );
}

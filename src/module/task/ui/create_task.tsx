"use client";
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { Avatar, Box, Button, Center, Flex, Group, Input, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { BsFiletypeCsv } from "react-icons/bs";
import CreateUsersProject from "./create_users_project";
import ResultsDateAndTask from "./results_date-and_task";
import ResultsFile from "./results_file";
import { useHookstate } from "@hookstate/core";
import { globalMemberTask } from "../lib/val_task";
import ViewDateEndTask from "./create_date_end_task";
import { IFormDateTask } from "../lib/type_task";

export default function CreateTask() {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openMember, setOpenMember] = useState(false)
  const [openTugas, setOpenTugas] = useState(false)
  const member = useHookstate(globalMemberTask)
  const [dataTask, setDataTask] = useState<IFormDateTask[]>([])


  if (openTugas) return <ViewDateEndTask onClose={(val) => {
    setDataTask([...dataTask, val])
    setOpenTugas(false)
  }} />;
  if (openMember) return <CreateUsersProject onClose={() => setOpenMember(false)} />


  return (
    <Box>
      <LayoutNavbarNew back="" title="tambah tugas" menu />
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
          <Box onClick={() => { setOpenTugas(true) }}>
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
            onClick={() => setOpenDrawer(true)}
          >
            <Text>Upload File</Text>
            <IoIosArrowDropright size={25} />
          </Group>
          <Box onClick={() => setOpenMember(true)}>
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
        {
          dataTask.length > 0 &&
          <Box pt={20}>
            <Text fw={'bold'} c={WARNA.biruTua}>Tanggal & Tugas</Text>
            {
              dataTask.map((v, i) => {
                return (
                  <Box key={i}>
                    <ResultsDateAndTask dateStart={v.dateStart} dateEnd={v.dateEnd} title={v.title} />
                  </Box>
                )
              })
            }
          </Box>
        }

        {/* <ResultsFile /> */}

        {
          member.length > 0 &&
          <Box pt={30}>
            <Group justify="space-between">
              <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
              <Text c={WARNA.biruTua}>Total {member.length} Anggota</Text>
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
                  {member.get().map((v: any, i: any) => {
                    return (
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        mt={20}
                        key={i}
                      >
                        <Group>
                          <Avatar src={"v.image"} alt="it's me" size="lg" />
                          <Box>
                            <Text c={WARNA.biruTua} fw={"bold"}>
                              {v.name}
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
        }


        <Box mt="xl">
          <Button color="white" bg={WARNA.biruTua} size="lg" radius={30} fullWidth onClick={() => router.push('/task')}>
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
          <Box onClick={() => router.push("/task/create?page=file-save")}>
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
    </Box >
  );
}

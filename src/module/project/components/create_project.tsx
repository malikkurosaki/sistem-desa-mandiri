"use client";
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Button, Center, Flex, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { BsFiletypeCsv } from "react-icons/bs";
import ResultsDateAndTask from "./results_date-and_task";
import ResultsFile from "./results_file";
import LayoutModal from "@/module/_global/layout/layout_modal";
import toast from "react-hot-toast";

export default function CreateProject({ searchParams }: { searchParams: any }) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isModal, setModal] = useState(false)

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
      router.push('/project')
    }
    setModal(false)
  }

  return (
    <Box>
      <LayoutNavbarNew back="/project" title="tambah proyek" menu />
      <Box p={20}>
        <Stack>
          <Select
            placeholder="Pilih Grup" label="Grup" w={"100%"} size="md" required withAsterisk radius={30}
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            data={['Dinas', 'Adat', 'LPD', 'PKK']}
          />
          <TextInput
            label="Proyek"
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            required withAsterisk
            placeholder="Nama Proyek"
            size="md"
          />
          <Box onClick={() => router.push("/project/create?page=task")}>
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
        </Stack>
        {
          (searchParams.anggota == 'yes') &&
          <>
            <ResultsDateAndTask />
          </>
        }

        {(searchParams.files == 'yes') &&
          <>
            <ResultsFile />
          </>
        }

        {
          (searchParams.button == 'yes') &&
          <>
            <Box mt="xl">
              <Button color="white" bg={WARNA.biruTua} size="lg" radius={30} fullWidth onClick={() => setModal(true)}>
                Simpan
              </Button>
            </Box>
          </>
        }
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
          <Box onClick={() => router.push("/project/create?page=file-save")}>
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

      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah data?"
        onYes={(val) => { onTrue(val) }} />
    </Box >
  );
}

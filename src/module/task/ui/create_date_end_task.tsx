"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Input,
  rem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IFormDateTask } from "../lib/type_task";
import moment from "moment";


export default function ViewDateEndTask({ onClose }: { onClose: (val: IFormDateTask) => void }) {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [title, setTitle] = useState("")
  const [touched, setTouched] = useState({
    title: false,
  });

  function onSubmit() {
    if (value[0] == null || value[1] == null)
      return toast.error("Error! harus memilih tanggal")

    if (title == "")
      return toast.error("Error! harus memasukkan judul tugas")

    onClose(
      {
        dateStart: value[0],
        dateEnd: value[1],
        title: title
      }
    )

  }

  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/task/create`} title={"Tanggal Tugas"} menu />
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
              <Text>{value[0] ? `${moment(value[0]).format('DD-MM-YYYY')}` : ""}</Text>
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
              <Text>{value[1] ? `${moment(value[1]).format('DD-MM-YYYY')}` : ""}</Text>
            </Group>
          </Box>
        </SimpleGrid>
        <Stack pt={15}>
          <TextInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Input Nama Tahapan"
            label="Judul Tugas"
            required
            size="md"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setTouched({ ...touched, title: false })
            }}
            onBlur={() => setTouched({ ...touched, title: true })}
            error={touched.title && title == "" ? "Judul Tugas Tidak Boleh Kosong" : null}
          />
        </Stack>
      </Box>
        <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${WARNA.bgWhite}`,
         }}>
          <Button
            c={"white"}
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => { onSubmit() }}
          >
            Simpan
          </Button>
        </Box>
    </Box>
  );
}

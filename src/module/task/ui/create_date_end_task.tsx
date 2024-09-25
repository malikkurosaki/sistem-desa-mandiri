"use client";
import { LayoutNavbarNew, TEMA } from "@/module/_global";
import {
  ActionIcon,
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
import { HiChevronLeft } from "react-icons/hi2";
import { useHookstate } from "@hookstate/core";


export default function ViewDateEndTask({ onClose, onSet }: {onClose: (val: boolean) => void, onSet: (val: IFormDateTask) => void }) {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [title, setTitle] = useState("")
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    title: false,
  });

  function onSubmit() {
    if (value[0] == null || value[1] == null)
      return toast.error("Error! harus memilih tanggal")

    if (title == "")
      return toast.error("Error! harus memasukkan judul tugas")

    onSet(
      {
        dateStart: value[0],
        dateEnd: value[1],
        title: title
      }
    )

  }

  return (
    <Box>
      <LayoutNavbarNew state={
        <Box>
          <ActionIcon variant="light" onClick={() => { onClose(true) }} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiChevronLeft size={20} color='white' />
          </ActionIcon>
        </Box>
      } title={"Tanggal dan Tugas"} menu />
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
            c={tema.get().utama}
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
            <Text >Tanggal Berakhir</Text>
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
        <Stack pt={15} mb={100}>
          <TextInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Input Judul Tahapan"
            label="Judul Tahapan"
            required
            size="md"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setTouched({ ...touched, title: false })
            }}
            onBlur={() => setTouched({ ...touched, title: true })}
            error={touched.title && title == "" ? "Judul Tahapan Tidak Boleh Kosong" : null}
          />
        </Stack>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        <Button
          c={"white"}
          bg={tema.get().utama}
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

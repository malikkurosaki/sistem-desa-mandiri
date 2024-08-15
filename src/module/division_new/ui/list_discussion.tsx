"use client"
import { WARNA } from "@/module/_global";
import { Box, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiUser, CiClock2 } from "react-icons/ci";
import { GoDiscussionClosed } from "react-icons/go";
import { funGetDetailDivisionById } from "../lib/api_division";
import { IDataDiscussionOnDetailDivision } from "../lib/type_division";

const dataDiskusi = [
  {
    id: 1,
    judul: "Mengatasi Limbah Makanan ",
    user: "Fibra Marcell",
    date: "21 Juni 2024",
  },
  {
    id: 2,
    judul: "Pentingnya Menjaga Kelestarian Hutan ",
    user: "Bayu Tegar",
    date: "15 Juni 2024",
  },
  {
    id: 3,
    judul: "Mengatasi Limbah Industri ",
    user: "Nian Putri",
    date: "11 Mei 2024",
  },
  {
    id: 4,
    judul: "Manfaat Sampah Plastik",
    user: "Budi Prasetyo",
    date: "10 Mei 2024",
  },
];

export default function ListDiscussionOnDetailDivision() {
  const router = useRouter();
  const param = useParams<{ id: string }>()
  const [data, setData] = useState<IDataDiscussionOnDetailDivision[]>([])
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await funGetDetailDivisionById(param.id, 'new-discussion');
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    fetchData()
  }, [param.id])

  return (
    <>
      <Box pt={10}>
        <Text c={WARNA.biruTua} mb={10} fw={"bold"} fz={16}>
          Diskusi Terbaru
        </Text>
        <Box
          bg={"white"}
          style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 20,
          }}
        >

          {
            loading ?
              Array(2)
                .fill(null)
                .map((_, i) => (
                  <Stack align="stretch" justify="center" key={i} pb={10}>
                    <Skeleton height={80} radius="md" m={0} />
                    <Group justify="space-between">
                      <Skeleton height={10} radius="md" m={0} w={100} />
                      <Skeleton height={10} radius="md" m={0} w={100} />
                    </Group>
                  </Stack>
                ))
              :
              (data.length === 0) ?
                <Stack align="stretch" justify="center" w={"100%"}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Belum ada diskusi</Text>
                </Stack>
                : <></>
          }
          {data.map((v, i) => {
            return (
              <Box
                key={i}
                style={{
                  borderRadius: 10,
                  border: `1px solid ${"#D6D8F6"}`,
                  padding: 10,
                }}
                mb={10}
                onClick={() => router.push(`/discussion/${v.id}`)}
              >
                <Group>
                  <GoDiscussionClosed size={25} />
                  <Box w={{ base: 230, md: 400 }}>
                    <Text fw={"bold"} truncate="end">
                      {v.desc}
                    </Text>
                  </Box>
                </Group>
                <Group justify="space-between" mt={20} c={"#8C8C8C"}>
                  <Group gap={5} align="center">
                    <CiUser size={18} />
                    <Text fz={13}>{v.user}</Text>
                  </Group>
                  <Group gap={5} align="center">
                    <CiClock2 size={18} />
                    <Text fz={13}>{v.date}</Text>
                  </Group>
                </Group>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

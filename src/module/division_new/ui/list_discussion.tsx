"use client"
import { WARNA } from "@/module/_global";
import { Box, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiUser, CiClock2 } from "react-icons/ci";
import { GoDiscussionClosed } from "react-icons/go";
import { funGetDetailDivisionById } from "../lib/api_division";
import { IDataDiscussionOnDetailDivision } from "../lib/type_division";


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
            padding: 10,
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
              <Box key={i} p={10}>
                <Box style={{
                    borderRadius: 10,
                    border: `1px solid ${"#D6D8F6"}`,
                    padding: 10,
                  }}
                  onClick={() => router.push(`${param.id}/discussion/${v.id}`)}
                >
                  <Group>
                    <GoDiscussionClosed size={25} />
                    <Box w={{ base: 230, md: 400 }}>
                      <Text fw={"bold"} truncate="end">
                        {v.desc}
                      </Text>
                    </Box>
                  </Group>
                  <Grid align="center" mt={20}>
                    <Grid.Col span={{
                      base: 7,
                      xl: 9
                    }}>
                      <Group gap={5} align="center">
                        <CiUser size={18} />
                        <Box w={{
                          base: 125,
                          xl: 300
                        }}>
                          <Text fz={13} lineClamp={1}>
                            {v.user}
                          </Text>
                        </Box>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={{
                      base: 5,
                      xl: 3
                    }}>
                      <Group gap={5} align="center" justify="flex-end">
                        <CiClock2 size={18} />
                        <Text fz={13}>{v.date}</Text>
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Box>

            );
          })}
        </Box>
      </Box>
    </>
  );
}

"use client"
import { TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiClock2, CiUser } from "react-icons/ci";
import { GoDiscussionClosed } from "react-icons/go";
import { funGetDetailDivisionById } from "../lib/api_division";
import { IDataDiscussionOnDetailDivision } from "../lib/type_division";


export default function ListDiscussionOnDetailDivision() {
  const router = useRouter();
  const param = useParams<{ id: string }>()
  const [data, setData] = useState<IDataDiscussionOnDetailDivision[]>([])
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 399px)');
  const tema = useHookstate(TEMA)
  const isMobile2 = useMediaQuery("(max-width: 438px)");

  async function fetchData() {
    try {
      setLoading(true);
      const res = await funGetDetailDivisionById(param.id, 'new-discussion');
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message);
      }
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
        <Text c={tema.get().utama} mb={10} fw={"bold"} fz={16}>
          Diskusi Terbaru
        </Text>
        {
          !loading && data.length === 0 ?
            <Stack align="stretch" justify="center" w={"100%"}>
              <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada diskusi</Text>
            </Stack>
            :
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
                      <Grid align='center'>
                        <Grid.Col
                          span={{
                            base: 1,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 1,
                            xl: 1,
                          }}
                        >
                          <GoDiscussionClosed size={25} />
                        </Grid.Col>
                        <Grid.Col
                          span={{
                            base: 11,
                            xs: 11,
                            sm: 11,
                            md: 11,
                            lg: 11,
                            xl: 11,
                          }}
                        >
                          <Text fw={"bold"} truncate="end" pl={isMobile2 ? 10 : 0} fz={isMobile ? 14 : 16}>
                            {v.desc}
                          </Text>
                        </Grid.Col>
                      </Grid>
                      <Grid align="center" mt={20}>
                        <Grid.Col span={{
                          base: 7,
                          xl: 9
                        }}>
                          <Group gap={5} align="center">
                            <CiUser size={18} />
                            <Box w={{
                              base: isMobile ? 110 : 125,
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
                            <Text fz={isMobile ? 11 : 13}>{v.date}</Text>
                          </Group>
                        </Grid.Col>
                      </Grid>
                    </Box>
                  </Box>

                );
              })}
            </Box>
        }
      </Box>
    </>
  );
}

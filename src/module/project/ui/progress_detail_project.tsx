'use client'
import { keyWibu, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Grid, Group, Progress, Skeleton, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiMiniPresentationChartBar } from 'react-icons/hi2';
import { IoIosWarning } from 'react-icons/io';
import { useWibuRealtime } from 'wibu-realtime';
import { funGetOneProjectById } from '../lib/api_project';
import { globalRefreshProject } from '../lib/val_project';

export default function ProgressDetailProject() {
  const [valProgress, setValProgress] = useState(0)
  const [valLastUpdate, setValLastUpdate] = useState('')
  const param = useParams<{ id: string }>()
  const refresh = useHookstate(globalRefreshProject)
  const [loading, setLoading] = useState(true)
  const tema = useHookstate(TEMA)
  const [reason, setReason] = useState("")
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  async function getOneData(loading: boolean) {
    try {
      setLoading(loading)
      const res = await funGetOneProjectById(param.id, 'progress');
      if (res.success) {
        setValProgress(res.data.progress);
        setValLastUpdate(res.data.lastUpdate);
      } else {
        toast.error(res.message);
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan progress Kegiatan, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  async function getOneDataCancel() {
    try {
      const res = await funGetOneProjectById(param.id, 'data');
      if (res.success) {
        setReason(res.data.reason);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan data Kegiatan, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    getOneDataCancel();
  }, [param.id])

  function onRefresh() {
    if (refresh.get()) {
      getOneData(false)
      refresh.set(false)
    }
  }

  useShallowEffect(() => {
    onRefresh()
  }, [refresh.get()])

  useShallowEffect(() => {
    getOneData(true);
  }, [param.id])

  useShallowEffect(() => {
    if (dataRealTime && dataRealTime.some((i: any) => i.category == 'project-detail-status' && i.id == param.id)) {
      getOneDataCancel()
      getOneData(false)
    }
  }, [dataRealTime])

  return (
    <>
      <Box mt={10}>
        {loading ? "" :
          (reason !== null && reason != "") ?
            (
              <Box mb={10}>
                <Box p={15} bg={"#FFF2CD"} style={{
                  borderRadius: 10,
                }}>
                  <Group align='center'>
                    <IoIosWarning size={25} />
                    <Text fw={"bold"}>Kegiatan dibatalkan</Text>
                  </Group>
                  <Text mt={5} truncate="end">{reason}</Text>
                </Box>
              </Box>
            )
            : null
        }
        {loading ?
          <Skeleton width={"100%"} height={100} radius={"md"} />
          :
          <Box
            p={20}
            bg={tema.get().bgTotalKegiatan}
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
                  // gradient={{ from: "#DFDA7C", to: "#F2AF46", deg: 174 }}
                  bg={tema.get().bgFiturHome}
                >
                  <HiMiniPresentationChartBar size={35} color={tema.get().utama} />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={9}>
                <Box>
                  <Text>Kemajuan Kegiatan {valProgress}%</Text>
                  <Progress
                    style={{
                      border: `1px solid ${"#BDBDBD"}`,
                    }}
                    w={"100%"}
                    color={tema.get().bgFiturHome}
                    radius="md"
                    size="xl"
                    value={valProgress}
                  />
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        }
      </Box>
    </>
  );
}


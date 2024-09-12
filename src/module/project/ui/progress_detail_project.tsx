'use client'
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Grid, Progress, Skeleton, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { HiMiniPresentationChartBar } from 'react-icons/hi2';
import { globalRefreshProject } from '../lib/val_project';
import toast from 'react-hot-toast';
import { funGetOneProjectById } from '../lib/api_project';
import { useShallowEffect } from '@mantine/hooks';
import { TEMA } from '@/module/_global';

export default function ProgressDetailProject() {
  const [valProgress, setValProgress] = useState(0)
  const [valLastUpdate, setValLastUpdate] = useState('')
  const param = useParams<{ id: string }>()
  const refresh = useHookstate(globalRefreshProject)
  const [loading, setLoading] = useState(true)
  const tema = useHookstate(TEMA)

  async function getOneData() {
    try {
      setLoading(true)
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

  function onRefresh() {
    if (refresh.get()) {
      getOneData()
      refresh.set(false)
    }
  }

  useShallowEffect(() => {
    onRefresh()
  }, [refresh.get()])

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <>
      <Box mt={10}>
        {loading ? 
          <Skeleton width={"100%"} height={100} radius={"md"} />
          :
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


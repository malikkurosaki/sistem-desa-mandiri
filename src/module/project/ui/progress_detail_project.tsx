'use client'
import { WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Grid, Progress, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiMiniPresentationChartBar } from 'react-icons/hi2';
import { globalRefreshProject } from '../lib/val_project';
import toast from 'react-hot-toast';
import { funGetOneProjectById } from '../lib/api_project';
import { useShallowEffect } from '@mantine/hooks';

export default function ProgressDetailProject() {
  const [valProgress, setValProgress] = useState(0)
  const [valLastUpdate, setValLastUpdate] = useState('')
  const param = useParams<{ id: string }>()
  const refresh = useHookstate(globalRefreshProject)

  async function getOneData() {
    try {
      const res = await funGetOneProjectById(param.id, 'progress');
      if (res.success) {
        setValProgress(res.data.progress);
        setValLastUpdate(res.data.lastUpdate);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan progress proyek, coba lagi nanti");
    }
  }

  function onRefresh() {
    if (refresh.get()) {
      getOneData()
      refresh.set(false)
    }
  }

  useEffect(() => {
    onRefresh()
  }, [refresh.get()])

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <>
      <Box mt={10}>
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
                gradient={{ from: "#DFDA7C", to: "#F2AF46", deg: 174 }}
              >
                <HiMiniPresentationChartBar size={35} color={WARNA.biruTua} />
              </ActionIcon>
            </Grid.Col>
            <Grid.Col span={9}>
              <Box>
                <Text>Kemajuan Proyek {valProgress}%</Text>
                <Progress
                  style={{
                    border: `1px solid ${"#BDBDBD"}`,
                  }}
                  w={"100%"}
                  color="#FCAA4B"
                  radius="md"
                  size="xl"
                  value={valProgress}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </>
  );
}


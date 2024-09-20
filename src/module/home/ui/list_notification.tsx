"use client"
import { currentScroll, TEMA, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Center, Flex, Grid, Group, Spoiler, Text } from '@mantine/core';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa6';
import { IListNotification } from '../lib/type_notification';
import { funGetAllNotification, funReadNotification } from '../lib/api_notification';
import toast from 'react-hot-toast';

const dataNotification = [
  {
    id: 1,
    title: 'Rapat Kamis Kamis Kamis Kamis Kamis Kamis Kamis Kamis ',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 2,
    title: 'Rapat Jumat',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 3,
    title: 'Rapat Senin',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 4,
    title: 'Rapat Selasa',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
  {
    id: 5,
    title: 'Rapat Rabu',
    description: 'Dipta menambahkan berkas di document dan file. Dipta menambahkan berkas di document dan file Dipta menambahkan berkas di document dan file',
  },
]

export default function ListNotification() {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 369px)')
  const [isData, setData] = useState<IListNotification[]>([])
  const tema = useHookstate(TEMA)
  const { value: containerRef } = useHookstate(currentScroll)
  const [isPage, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  async function fetchData(loading: boolean) {
    try {
      if (loading)
        setLoading(true)
      const res = await funGetAllNotification('?page=' + isPage)
      if (res.success) {
        if (isPage == 1) {
          setData(res.data)
        } else {
          setData([...isData, ...res.data])
        }

      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal memuat data, coba lagi nanti")
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    fetchData(true)
  }, [])

  useShallowEffect(() => {
    fetchData(false)
  }, [isPage])

  useEffect(() => {
    const handleScroll = async () => {
      if (containerRef && containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;
        const scrollHeight = containerRef.current.scrollHeight;

        if (scrollTop + containerHeight >= scrollHeight) {
          setPage(isPage + 1)
        }

      }
    };

    const container = containerRef?.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, isPage]);



  async function onReadNotif(category: string, idContent: string, idData: string) {
    try {
      const response = await funReadNotification({ id: idData })
      if (response.success) {
        router.push(`/${category}/${idContent}`)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal memuat data, coba lagi nanti")
    }
  }



  return (
    <Box>
      {
        isData.length == 0 ?
          <Flex justify={"center"} align={'center'} h={"100%"}>
            <Text ta={'center'} fz={14} c={'dimmed'} fs={"italic"}>Tidak ada notifikasi</Text>
          </Flex>
          :
          isData.map((v, i) => {
            return (
              <Box key={i} my={15}>
                <Box style={{
                  border: `1px solid ${tema.get().utama}`,
                  padding: 20,
                  borderRadius: 15
                }}
                  onClick={() => {
                    onReadNotif(v.category, v.idContent, v.id)
                  }}
                >
                  <Group align='center'>
                    <ActionIcon variant="light" bg={tema.get().utama} size={35} radius={100} aria-label="icon">
                      <FaBell size={20} color='white' />
                    </ActionIcon>
                    <Box
                      w={{
                        base: isMobile ? 200 : 240,
                        xl: 380
                      }}
                    >
                      <Text fw={'bold'} fz={isMobile ? 16 : 18} lineClamp={1}>{v.title}</Text>
                    </Box>
                  </Group>
                  <Spoiler maxHeight={60} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                    <Text mt={10} fz={15}>{v.desc}</Text>
                  </Spoiler>
                </Box>
              </Box>
            )
          })
      }
      { }
    </Box>
  );
}


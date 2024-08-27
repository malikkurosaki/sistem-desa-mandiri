'use client'
import { WARNA } from '@/module/_global';
import { Box, Group, Skeleton, Text } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { funGetOneProjectById } from '../lib/api_project';
import { useParams } from 'next/navigation';
import { useShallowEffect } from '@mantine/hooks';
import { IDataFileProject } from '../lib/type_project';
import { BsFiletypeCsv, BsFiletypeHeic, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from 'react-icons/bs';

export default function ListFileDetailProject() {
  const [isData, setData] = useState<IDataFileProject[]>([])
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)

  async function getOneData() {
    try {
      setLoading(true)
      const res = await funGetOneProjectById(param.id, 'file');
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan file Kegiatan, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <>
      <Box pt={20}>
        <Text fw={'bold'} c={WARNA.biruTua}>File</Text>
        <Box bg={"white"} style={{
          borderRadius: 10,
          border: `1px solid ${"#D6D8F6"}`,
          padding: 20
        }}>
          {

            loading ?
              Array(1)
                .fill(null)
                .map((_, i) => (
                  <Box key={i} mb={10}>
                    <Group>
                      <Skeleton width={30} height={30} radius={"md"} />
                      <Skeleton width={"50%"} height={30} radius={"md"} />
                    </Group>
                  </Box>
                ))
              :
              isData.length === 0 ? <Text>Tidak ada file</Text> :
                isData.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      style={{
                        borderRadius: 10,
                        border: `1px solid ${"#D6D8F6"}`,
                        padding: 10
                      }}
                      mb={10}
                    >
                      <Group>
                        {item.extension == "pdf" && <BsFiletypePdf size={25} />}
                        {item.extension == "csv" && <BsFiletypeCsv size={25} />}
                        {item.extension == "png" && <BsFiletypePng size={25} />}
                        {item.extension == "jpg" || item.extension == "jpeg" && <BsFiletypeJpg size={25} />}
                        {item.extension == "heic" && <BsFiletypeHeic size={25} />}
                        <Text>{item.name}</Text>
                      </Group>
                    </Box>
                  )
                })
          }
        </Box>
      </Box>
    </>
  );
}


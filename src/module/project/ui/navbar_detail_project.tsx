'use client'
import { globalRole, LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFileCirclePlus, FaPencil, FaUsers } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import { IoAddCircle } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { funGetOneProjectById } from '../lib/api_project';
import { useShallowEffect } from '@mantine/hooks';
import { useHookstate } from '@hookstate/core';

export default function NavbarDetailProject() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [isOpen, setOpen] = useState(false)
  const roleLogin = useHookstate(globalRole)

  async function getOneData() {
    try {
      const res = await funGetOneProjectById(param.id, 'data');
      if (res.success) {
        setName(res.data.title);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan data Kegiatan, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <>
      <LayoutNavbarNew back="/project?status=0" title={name} menu={
        <ActionIcon
          variant="light"
          bg={WARNA.bgIcon}
          size="lg"
          radius="lg"
          aria-label="Settings"
          onClick={() => { setOpen(true) }}
        >
          <HiMenu size={20} color="white" />
        </ActionIcon>
      } />

      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <Box>
          <Stack pt={10}>
            <SimpleGrid
              cols={{ base: 3, sm: 3, lg: 3 }}
            >
              <Flex justify={'center'} align={'center'} direction={'column'}
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  router.push(param.id + '/add-task')
                }}
              >
                <Box>
                  <IoAddCircle size={30} color={WARNA.biruTua} />
                </Box>
                <Box>
                  <Text c={WARNA.biruTua} ta='center'>Tambah Tugas</Text>
                </Box>
              </Flex>

              <Flex justify={'center'} align={'center'} direction={'column'}
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  router.push(param.id + '/add-file')
                }}
              >
                <Box>
                  <FaFileCirclePlus size={30} color={WARNA.biruTua} />
                </Box>
                <Box>
                  <Text c={WARNA.biruTua} ta='center'>Tambah file</Text>
                </Box>
              </Flex>

              {
                (roleLogin.get() != "user" && roleLogin.get() != "coadmin") &&
                <>
                  <Flex justify={'center'} align={'center'} direction={'column'}
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      router.push(param.id + '/add-member')
                    }}
                  >
                    <Box>
                      <FaUsers size={30} color={WARNA.biruTua} />
                    </Box>
                    <Box>
                      <Text c={WARNA.biruTua} ta='center'>Tambah anggota</Text>
                    </Box>
                  </Flex>

                  <Flex justify={'center'} align={'center'} direction={'column'}
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => { router.push(param.id + '/edit') }}
                  >
                    <Box>
                      <FaPencil size={30} color={WARNA.biruTua} />
                    </Box>
                    <Box>
                      <Text c={WARNA.biruTua} ta='center'>Edit</Text>
                    </Box>
                  </Flex>

                  <Flex justify={'center'} align={'center'} direction={'column'}
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => { router.push(param.id + '/cancel') }}
                  >
                    <Box>
                      <MdCancel size={30} color={WARNA.biruTua} />
                    </Box>
                    <Box>
                      <Text c={WARNA.biruTua} ta='center'>Batal</Text>
                    </Box>
                  </Flex>
                </>
              }

            </SimpleGrid>
          </Stack>
        </Box>
      </LayoutDrawer>
    </>
  );
}


'use client'
import { globalRole, keyWibu, LayoutDrawer, LayoutNavbarNew, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFileCirclePlus, FaPencil, FaUsers } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import { IoAddCircle } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import { useWibuRealtime } from 'wibu-realtime';
import { funGetOneProjectById } from '../lib/api_project';

export default function NavbarDetailProject() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [grup, setGrup] = useState("")
  const [isOpen, setOpen] = useState(false)
  const roleLogin = useHookstate(globalRole)
  const tema = useHookstate(TEMA)
  const [reason, setReason] = useState("")
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  async function getOneData() {
    try {
      const res = await funGetOneProjectById(param.id, 'data');
      if (res.success) {
        setName(res.data.title);
        setReason(res.data.reason);
        setGrup(res.data.idGroup);
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

  useShallowEffect(() => {
    if (dataRealTime && dataRealTime.some((i: any) => (i.category == 'project-detail' || i.category == 'project-detail-status') && i.id == param.id)) {
      getOneData()
    }
  }, [dataRealTime])

  return (
    <>
      <LayoutNavbarNew back={`/project?group=${grup}`} title={name} menu={
        <ActionIcon
          variant="light"
          bg={tema.get().bgIcon}
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
              style={{
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Flex justify={'center'} align={'center'} direction={'column'}
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  reason == null ?
                    router.push(param.id + '/add-task')
                    : null
                }}
                pb={20}
              >
                <Box>
                  <IoAddCircle size={30} color={reason == null ? tema.get().utama : "gray"} />
                </Box>
                <Box>
                  <Text c={reason == null ? tema.get().utama : "gray"} ta='center'>Tambah Tugas</Text>
                </Box>
              </Flex>

              <Flex justify={'center'} align={'center'} direction={'column'}
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  reason == null ?
                    router.push(param.id + '/add-file')
                    : null
                }}
              >
                <Box>
                  <FaFileCirclePlus size={30} color={reason == null ? tema.get().utama : "gray"} />
                </Box>
                <Box>
                  <Text c={reason == null ? tema.get().utama : "gray"} ta='center'>Tambah file</Text>
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
                      reason == null ?
                        router.push(param.id + '/add-member')
                        : null
                    }}
                  >
                    <Box>
                      <FaUsers size={30} color={reason == null ? tema.get().utama : "gray"} />
                    </Box>
                    <Box>
                      <Text c={reason == null ? tema.get().utama : "gray"} ta='center'>Tambah anggota</Text>
                    </Box>
                  </Flex>

                  <Flex justify={'center'} align={'center'} direction={'column'}
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      reason == null ?
                        router.push(param.id + '/edit')
                        : null
                    }}
                  >
                    <Box>
                      <FaPencil size={30} color={reason == null ? tema.get().utama : "gray"} />
                    </Box>
                    <Box>
                      <Text c={reason == null ? tema.get().utama : "gray"} ta='center'>Edit</Text>
                    </Box>
                  </Flex>

                  <Flex justify={'center'} align={'center'} direction={'column'}
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      reason == null ?
                        router.push(param.id + '/cancel')
                        : null
                    }}
                  >
                    <Box>
                      <MdCancel size={30} color={reason == null ? tema.get().utama : "gray"} />
                    </Box>
                    <Box>
                      <Text c={reason == null ? tema.get().utama : "gray"} ta='center'>Batal</Text>
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


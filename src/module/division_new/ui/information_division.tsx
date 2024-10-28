"use client"
import { globalRole, LayoutDrawer, LayoutNavbarNew, SkeletonList, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { funGetUserByCookies } from '@/module/auth';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Avatar, Box, Divider, Flex, Grid, Group, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaPencil, FaToggleOff, FaUserTie } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import { IoIosCloseCircle, IoIosWarning } from 'react-icons/io';
import { funDeleteMemberDivision, funEditStatusAdminDivision, funGetDivisionById, funUpdateStatusDivision } from '../lib/api_division';
import { IDataMemberDivision } from '../lib/type_division';


export default function InformationDivision() {
  const router = useRouter()
  const [openDrawer, setDrawer] = useState(false)
  const [openDrawerInfo, setDrawerInfo] = useState(false)
  const [valActive, setValActive] = useState(true)
  const param = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [member, setMember] = useState<IDataMemberDivision[]>([])
  const [loading, setLoading] = useState(true)
  const [valChooseMember, setChooseMember] = useState("")
  const [valChooseMemberStatus, setChooseMemberStatus] = useState<boolean>(false)
  const [valChooseMemberName, setChooseMemberName] = useState("")
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenModalStatus, setOpenModalStatus] = useState(false)
  const roleLogin = useHookstate(globalRole)
  const [isAdmin, setAdmin] = useState(false)
  const isMobile = useMediaQuery('(max-width: 455px)');
  const isMobile2 = useMediaQuery("(max-width: 438px)");
  const tema = useHookstate(TEMA)
  const [loadingStatus, setLoadingStatus] = useState(false)

  async function getOneData() {
    try {
      setLoading(true);
      const res = await funGetDivisionById(param.id);
      const login = await funGetUserByCookies()
      if (res.success) {
        setName(res.data.division.name);
        setDeskripsi(res.data.division.desc);
        setMember(res.data.member)
        setValActive(res.data.division.isActive)
        const cek = res.data.member.some((i: any) => i.idUser == login.id && i.isAdmin == true)
        setAdmin(cek)
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
    getOneData();
  }, [param.id])


  async function onClickMember(id: string, status: boolean) {
    setChooseMember(id)
    setChooseMemberStatus(status)
    setDrawer(true)
  }


  async function deleteMember() {
    try {
      const res = await funDeleteMemberDivision(param.id, { id: valChooseMember })
      if (res.success) {
        toast.success(res.message)
        setDrawer(false)
        getOneData()
      } else {
        toast.error(res.message)
      }
      setOpenModal(false)
    } catch (error) {
      console.error(error);
      setOpenModal(false)
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    }
  }


  async function editStatusAdmin() {
    try {
      const res = await funEditStatusAdminDivision(param.id, { id: valChooseMember, isAdmin: valChooseMemberStatus })
      if (res.success) {
        toast.success(res.message)
        getOneData()
      } else {
        toast.error(res.message)
      }
      setDrawer(false)
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    }
  }

  async function editStatusDivisi() {
    try {
      setLoadingStatus(true)
      const res = await funUpdateStatusDivision(param.id, { isActive: valActive })
      if (res.success) {
        toast.success(res.message)
        getOneData()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    } finally {
      setDrawerInfo(false)
      setLoadingStatus(false)
      setOpenModalStatus(false)
    }
  }

  return (
    <Box>
      <LayoutNavbarNew back={"/division/" + param.id} title={name}
        menu={
          ((roleLogin.get() != 'user' && roleLogin.get() != 'coadmin') || isAdmin) ?
            <ActionIcon variant="light" onClick={() => { setDrawerInfo(true) }} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
              <HiMenu size={20} color='white' />
            </ActionIcon>
            : <></>
        }
      />
      <Box p={20}>
        {
          !valActive ?
            <Box mb={10}>
              <Box p={15} bg={"#FFF2CD"} style={{
                borderRadius: 10,
              }}>
                <Group align='center'>
                  <IoIosWarning size={25} />
                  <Text fw={"bold"}>Divisi dinonaktifkan</Text>
                </Group>
              </Box>
            </Box>
            : <></>
        }

        <Box>
          <Text fw={"bold"}>Deskripsi Divisi</Text>
          <Box p={20} bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${tema.get().bgTotalKegiatan}`,
          }}>
            {
              loading ?
                Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <Stack align="stretch" justify="center" key={i} mb={10}>
                      <Skeleton height={10} radius="md" m={0} />
                    </Stack>
                  ))
                :
                (deskripsi != null && deskripsi != undefined && deskripsi != "") ?
                  <Text ta={"justify"}>{deskripsi}</Text>
                  : <Text ta={"center"} c={"dimmed"} fs={"italic"}>Tidak ada deskripsi</Text>
            }
          </Box>
        </Box>
        <Box mt={20}>
          <Box p={20} bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${tema.get().bgTotalKegiatan}`,
          }}>
            <Box>
              <Text>{member.length} Anggota</Text>
            </Box>
            <Box mt={15}>
              {loading ?
                <Box>
                  <Grid p={10} align="center">
                    <Grid.Col span={2}>
                      <Skeleton w={50} h={50} radius={100} />
                    </Grid.Col>
                    <Grid.Col span={9}>
                      <Skeleton w={"80%"} h={20} />
                    </Grid.Col>
                  </Grid>
                </Box>
                :

                (((roleLogin.get() != 'user' && roleLogin.get() != 'coadmin') || isAdmin) && valActive) ?
                  <Group align='center' onClick={() => router.push('/division/add-member/' + param.id)}>
                    <Avatar size={'lg'}>
                      <AiOutlineUserAdd size={30} color={tema.get().utama} />
                    </Avatar>
                    <Text fz={isMobile ? 14 : 16}>Tambah Anggota</Text>
                  </Group>
                  : <></>
              }
            </Box>
            <Box pt={10}>
              <Box mb={10}>
                {loading
                  ? Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <Box key={i}>
                        <SkeletonList />
                      </Box>
                    ))
                  : member.map((v, i) => {
                    return (
                      <Box key={i}>
                        <Grid align='center' mt={10}
                          onClick={() => {
                            if ((roleLogin.get() != 'user' && roleLogin.get() != 'coadmin') || isAdmin) {
                              onClickMember(v.id, (v.isAdmin) ? true : false)
                              setChooseMemberName(v.name)
                            }
                          }}
                        >
                          <Grid.Col span={1}>
                            <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size={'lg'} />
                          </Grid.Col>
                          <Grid.Col span={8}>
                            <Text c={tema.get().utama} fw={"bold"} truncate="end" pl={isMobile2 ? 40 : 30} fz={isMobile ? 14 : 16}>
                              {v.name}
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <Text c={tema.get().utama} fw={"bold"} ta={'end'} fz={isMobile ? 13 : 16}>
                              {(v.isAdmin) ? 'Admin' : 'Anggota'}
                            </Text>
                          </Grid.Col>
                        </Grid>
                        <Box mt={10}>
                          <Divider size={"xs"} />
                        </Box>
                      </Box>
                    );
                  })
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <LayoutDrawer opened={openDrawer} onClose={() => setDrawer(false)} title={valChooseMemberName}>
        <Box>
          <Group align='center' mb={20} onClick={() => valActive ? editStatusAdmin() : undefined}>
            <ActionIcon variant="light" size={60} aria-label="admin" radius="xl">
              <FaUserTie size={30} color={valActive ? tema.get().utama : "gray"} />
            </ActionIcon>
            <Text c={valActive ? tema.get().utama : "gray"}>{(valChooseMemberStatus == false) ? "Jadikan admin" : "Memberhentikan sebagai admin"}</Text>
          </Group>
          <Group align='center' onClick={() => valActive ? setOpenModal(true) : undefined}>
            <ActionIcon variant="light" size={60} aria-label="admin" radius="xl">
              <IoIosCloseCircle size={40} color={valActive ? tema.get().utama : "gray"} />
            </ActionIcon>
            <Text c={valActive ? tema.get().utama : "gray"}>Keluarkan dari divisi</Text>
          </Group>
        </Box>
      </LayoutDrawer>

      <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin mengeluarkan anggota?"
        onYes={(val) => {
          if (!val) {
            setOpenModal(false)
          } else {
            deleteMember()
          }
        }} />

      <LayoutDrawer opened={openDrawerInfo} onClose={() => setDrawerInfo(false)} title={"Menu"}>
        <Box>
          <Stack pt={10}>
            <SimpleGrid cols={{ base: 2, sm: 2, lg: 3 }} >
              <Flex onClick={() => router.push('/division/edit/' + param.id)} justify={'center'} align={'center'} direction={'column'} >
                <Box>
                  <FaPencil size={30} color={tema.get().utama} />
                </Box>
                <Box>
                  <Text c={tema.get().utama}>Edit Divisi</Text>
                </Box>
              </Flex>
              <Flex onClick={() => { setOpenModalStatus(true) }} justify={'center'} align={'center'} direction={'column'} >
                <Box>
                  <FaToggleOff size={30} color={tema.get().utama} />
                </Box>
                <Box>
                  <Text c={tema.get().utama}>{valActive ? "Non Aktifkan Divisi" : "Aktifkan Divisi"}</Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Stack>
        </Box>
      </LayoutDrawer>

      <LayoutModal loading={loadingStatus} opened={isOpenModalStatus} onClose={() => setOpenModalStatus(false)}
        description="Apakah Anda yakin ingin mangubah status aktifasi divisi?"
        onYes={(val) => {
          if (!val) {
            setOpenModalStatus(false)
          } else {
            editStatusDivisi()
          }
        }} />
    </Box>
  );
}

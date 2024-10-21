"use client";
import { keyWibu, LayoutDrawer, LayoutNavbarNew, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Divider, Flex, Grid, Group, rem, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { Dropzone } from '@mantine/dropzone';
import { useMediaQuery } from "@mantine/hooks";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { IoIosArrowDropright } from "react-icons/io";
import { useWibuRealtime } from "wibu-realtime";
import { funCreateTask } from "../lib/api_task";
import { IFormDateTask, IFormMemberTask, IListFileTask } from "../lib/type_task";
import { globalMemberTask } from "../lib/val_task";
import ViewDateEndTask from "./create_date_end_task";
import CreateUsersProject from "./create_users_project";
import ResultsDateAndTask from "./results_date-and_task";
import ResultsFile from "./results_file";

export default function CreateTask() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [loadingModal, setLoadingModal] = useState(false)
  const [openDrawerFile, setOpenDrawerFile] = useState(false)
  const [openDrawerTask, setOpenDrawerTask] = useState(false)
  const [openMember, setOpenMember] = useState(false)
  const [openTugas, setOpenTugas] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const member = useHookstate(globalMemberTask)
  const memberValue = member.get() as IFormMemberTask[]
  const [dataTask, setDataTask] = useState<IFormDateTask[]>([])
  const openRef = useRef<() => void>(null)
  const [fileForm, setFileForm] = useState<any[]>([])
  const [imgForm, setImgForm] = useState<any>()
  const [listFile, setListFile] = useState<IListFileTask[]>([])
  const [indexDelFile, setIndexDelFile] = useState<number>(0)
  const [indexDelTask, setIndexDelTask] = useState<number>(0)
  const isMobile = useMediaQuery('(max-width: 369px)');
  const [title, setTitle] = useState("")
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    title: false,
  });
  const [data, setData] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  function deleteFile(index: number) {
    setListFile([...listFile.filter((val, i) => i !== index)])
    setFileForm([...fileForm.filter((val, i) => i !== index)])
    setOpenDrawerFile(false)
  }

  function deleteTask(index: number) {
    setDataTask([...dataTask.filter((val, i) => i !== index)])
    setOpenDrawerTask(false)
  }


  async function onSubmit() {
    try {
      setLoadingModal(true)
      const fd = new FormData();
      for (let i = 0; i < fileForm.length; i++) {
        fd.append(`file${i}`, fileForm[i]);
      }

      fd.append("data", JSON.stringify({
        idDivision: param.id,
        title,
        task: dataTask,
        member: memberValue
      }))

      const response = await funCreateTask(fd)

      if (response.success) {
        setData(response.notif)
        toast.success(response.message)
        setTitle("")
        member.set([])
        setFileForm([])
        setListFile([])
        setDataTask([])
        router.push(`/division/${param.id}/task/`)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal menambahkan tugas divisi, coba lagi nanti");
    } finally {
      setLoadingModal(false)
      setOpenModal(false)
    }
  }


  function onCheck() {
    const cek = checkAll()
    if (!cek)
      return false

    if (dataTask.length == 0)
      return toast.error("Error! silahkan tambahkan tugas")

    if (memberValue.length <= 1)
      return toast.error("Error! silahkan pilih anggota lebih dari 1")

    setOpenModal(true)
  }


  function checkAll() {
    let nilai = true
    if (title === "") {
      setTouched(touched => ({ ...touched, title: true }))
      nilai = false
    }
    return nilai
  }


  function onValidation(kategori: string, val: string) {
    if (kategori == 'title') {
      setTitle(val)
      if (val === "") {
        setTouched({ ...touched, title: true })
      } else {
        setTouched({ ...touched, title: false })
      }
    }
  }



  if (openTugas) return <ViewDateEndTask onClose={(val) => { setOpenTugas(false) }} onSet={(val) => {
    setDataTask([...dataTask, val])
    setOpenTugas(false)
  }} />;

  if (openMember) return <CreateUsersProject onClose={() => setOpenMember(false)} />


  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/task/`} title="tambah tugas" menu />
      <Box p={20}>
        <Stack>
          <TextInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Judul Tugas"
            size="md"
            label="Judul Tugas"
            value={title}
            onChange={(e) => { onValidation('title', e.target.value) }}
            required
            error={
              touched.title && (
                title == "" ? "Judul Tugas Tidak Boleh Kosong" : null
              )
            }
          />
          <Box onClick={() => { setOpenTugas(true) }}>
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text>Tambah Tanggal & Tugas</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
          <Group
            justify="space-between"
            p={10}
            style={{
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
            }}
            onClick={() =>
              // setOpenDrawer(true)
              openRef.current?.()
            }
          >
            <Text>Upload File</Text>
            <IoIosArrowDropright size={25} />
          </Group>
          <Box onClick={() => setOpenMember(true)}>
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text>Tambah Anggota</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
        </Stack>
        <Box pb={100}>
          {
            dataTask.length > 0 &&
            <Box pt={20}>
              <Text fw={'bold'} c={tema.get().utama}>Tanggal & Tugas</Text>
              {
                dataTask.map((v, i) => {
                  return (
                    <Box key={i} onClick={() => {
                      setIndexDelTask(i)
                      setOpenDrawerTask(true)
                    }}>
                      <ResultsDateAndTask dateStart={v.dateStart} dateEnd={v.dateEnd} title={v.title} />
                    </Box>
                  )
                })
              }
            </Box>
          }

          {
            listFile.length > 0 &&
            <Box pt={20}>
              <Text fw={'bold'} c={tema.get().utama}>File</Text>
              <Box bg={"white"} style={{
                borderRadius: 10,
                border: `1px solid ${"#D6D8F6"}`,
                padding: 20
              }}>
                {
                  listFile.map((v, i) => {
                    return (
                      <Box key={i} onClick={() => {
                        setIndexDelFile(i)
                        setOpenDrawerFile(true)
                      }}>
                        <ResultsFile name={v.name} extension={v.extension} />
                      </Box>
                    )
                  })
                }
              </Box>
            </Box>
          }


          {
            member.length > 0 &&
            <Box pt={30}>
              <Group justify="space-between">
                <Text c={tema.get().utama}>Anggota Terpilih</Text>
                <Text c={tema.get().utama}>Total {member.length} Anggota</Text>
              </Group>
              <Box pt={10}>
                <Box mb={20}>
                  <Box
                    style={{
                      border: `1px solid ${"#C7D6E8"}`,
                      borderRadius: 10,
                    }}
                    px={20}
                    py={10}
                  >
                    {member.get().map((v: any, i: any) => {
                      return (
                        <Box key={i}>
                          <Grid align='center' mt={10}
                          >
                            <Grid.Col span={9}>
                              <Group>
                                <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size={isMobile ? 'md' : 'lg'} />
                                <Box w={{
                                  base: isMobile ? 130 : 140,
                                  xl: 270
                                }}>
                                  <Text c={tema.get().utama} fw={"bold"} lineClamp={1} fz={isMobile ? 14 : 16}>
                                    {v.name}
                                  </Text>
                                </Box>
                              </Group>
                            </Grid.Col>
                            <Grid.Col span={3}>
                              <Text c={tema.get().utama} fw={"bold"} ta={'end'} fz={isMobile ? 13 : 16}>
                                Anggota
                              </Text>
                            </Grid.Col>
                          </Grid>
                          <Box mt={10}>
                            <Divider size={"xs"} />
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          }
        </Box>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        <Button
          color="white"
          bg={tema.get().utama}
          size="lg" radius={30}
          fullWidth
          onClick={() => { onCheck() }}>
          Simpan
        </Button>
      </Box>

      <Dropzone
        openRef={openRef}
        onDrop={async (files) => {
          if (!files || _.isEmpty(files))
            return toast.error('Tidak ada file yang dipilih')
          setFileForm([...fileForm, files[0]])
          setListFile([...listFile, { name: files[0].name, extension: files[0].type.split("/")[1] }])
        }}
        activateOnClick={false}
        maxSize={3 * 1024 ** 2}
        accept={['image/png', 'image/jpeg', 'image/heic', 'application/pdf']}
        onReject={(files) => {
          return toast.error('File yang diizinkan: .png, .jpg, .heic, .pdf dengan ukuran maksimal 3 MB')
        }}
      ></Dropzone>



      {/* Drawer pilih file */}
      {/* <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={"Pilih File"}
      >
        <Flex justify={"flex-start"} px={20}>

          <Box onClick={() => openRef.current?.()}>
            <Box
              bg={"#DCEED8"}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Center>
                <BsFiletypeCsv size={40} />
              </Center>
            </Box>
            <Text mt={10} ta={"center"}>
              Pilih file
            </Text>
            <Text ta={"center"}>diperangkat</Text>
          </Box>

          <Box onClick={() => router.push("/task/create?page=file-save")}>
            <Box
              bg={"#DCEED8"}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Center>
                <BsFiletypeCsv size={40} />
              </Center>
            </Box>
            <Text mt={10} ta={"center"}>
              Pilih file yang
            </Text>
            <Text ta={"center"}>sudah ada</Text>
          </Box>
        </Flex>
      </LayoutDrawer> */}



      {/* Drawer hapus file */}
      <LayoutDrawer
        opened={openDrawerFile}
        onClose={() => setOpenDrawerFile(false)}
        title={""}
      >
        <Stack pt={10}>
          <SimpleGrid cols={{ base: 3, sm: 3, lg: 3 }} >
            <Flex style={{ cursor: 'pointer' }} justify={'center'} align={'center'} direction={'column'} onClick={() => deleteFile(indexDelFile)}>
              <Box>
                <FaTrash size={30} color={tema.get().utama} />
              </Box>
              <Box>
                <Text c={tema.get().utama} ta='center'>Hapus File</Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Stack>
      </LayoutDrawer>


      {/* Drawer hapus tugas */}
      <LayoutDrawer
        opened={openDrawerTask}
        onClose={() => setOpenDrawerTask(false)}
        title={""}
      >
        <Stack pt={10}>
          <SimpleGrid cols={{ base: 3, sm: 3, lg: 3 }} >
            <Flex style={{ cursor: 'pointer' }} justify={'center'} align={'center'} direction={'column'} onClick={() => deleteTask(indexDelTask)}>
              <Box>
                <FaTrash size={30} color={tema.get().utama} />
              </Box>
              <Box>
                <Text c={tema.get().utama} ta='center'>Hapus Tugas</Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Stack>
      </LayoutDrawer>




      <LayoutModal loading={loadingModal} opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          } else {
            setOpenModal(false)
          }
        }} />
    </Box >
  );
}

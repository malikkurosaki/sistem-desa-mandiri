"use client";
import { globalRole, keyWibu, LayoutDrawer, LayoutNavbarNew, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetUserByCookies } from "@/module/auth";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Divider, Flex, Grid, Group, rem, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { IoIosArrowDropright } from "react-icons/io";
import { useWibuRealtime } from "wibu-realtime";
import { funCreateProject } from "../lib/api_project";
import { IFormDateProject, IFormMemberProject, IListFileTaskProject } from "../lib/type_project";
import { globalMemberProject } from "../lib/val_project";
import ViewDateEndTask from "./create_date_end_task";
import CreateUsersProject from "./create_users_project";
import ResultsDateAndTask from "./results_date-and_task";
import ResultsFile from "./results_file";

export default function CreateProject() {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDrawerFile, setOpenDrawerFile] = useState(false)
  const [openDrawerTask, setOpenDrawerTask] = useState(false)
  const [isModal, setModal] = useState(false)
  const [dataGroup, setDataGroup] = useState<IDataGroup[]>([]);
  const [isChooseAnggota, setChooseAnggota] = useState(false)
  const member = useHookstate(globalMemberProject)
  const memberValue = member.get() as IFormMemberProject[]
  const [openTugas, setOpenTugas] = useState(false)
  const [dataTask, setDataTask] = useState<IFormDateProject[]>([])
  const openRef = useRef<() => void>(null)
  const [fileForm, setFileForm] = useState<any[]>([])
  const [listFile, setListFile] = useState<IListFileTaskProject[]>([])
  const [indexDelFile, setIndexDelFile] = useState<number>(0)
  const [indexDelTask, setIndexDelTask] = useState<number>(0)
  const roleLogin = useHookstate(globalRole)
  const isMobile = useMediaQuery('(max-width: 369px)');
  const tema = useHookstate(TEMA)
  const [loadingModal, setLoadingModal] = useState(false)

  const [body, setBody] = useState<any>({
    idGroup: "",
    title: "",
  });
  const [touched, setTouched] = useState({
    title: false,
    idGroup: false,
    desc: false
  });

  const [data, setDataRealtime] = useWibuRealtime({
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

  async function loadData() {
    const loadGroup = await funGetAllGroup('?active=true')
    if (loadGroup.success) {
      setDataGroup(loadGroup.data);
    } else {
      toast.error(loadGroup.message);
    }

    if (roleLogin.get() != "supadmin") {
      const loadUser = await funGetUserByCookies();
      setBody({ ...body, idGroup: loadUser.idGroup })
    }

  }

  function onToChooseAnggota() {
    if (roleLogin.get() == "supadmin" && body.idGroup == "")
      return toast.error("Error! grup harus diisi")
    setChooseAnggota(true)
  }

  function onChooseGroup(val: any) {
    member.set([])
    setBody({ ...body, idGroup: val })
  }

  useShallowEffect(() => {
    loadData();
  }, []);


  async function onSubmit() {
    try {
      setLoadingModal(true)
      const fd = new FormData();
      for (let i = 0; i < fileForm.length; i++) {
        fd.append(`file${i}`, fileForm[i]);
      }

      fd.append("data", JSON.stringify({
        title: body.title,
        idGroup: body.idGroup,
        task: dataTask,
        member: memberValue
      }))

      const response = await funCreateProject(fd)

      if (response.success) {
        setDataRealtime(response.notif)
        toast.success(response.message)
        member.set([])
        setFileForm([])
        setListFile([])
        setDataTask([])
        router.push('/project')
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal menambahkan kegiatan, coba lagi nanti");
    } finally {
      setLoadingModal(false)
      setModal(false)
    }
  }



  if (openTugas) return <ViewDateEndTask onClose={(val) => { setOpenTugas(false) }} onSet={(val) => { setDataTask([...dataTask, val]); setOpenTugas(false) }} />;

  if (isChooseAnggota) return <CreateUsersProject grup={body.idGroup} onClose={() => { setChooseAnggota(false) }} />


  return (
    <Box>
      <LayoutNavbarNew back="/project" title="tambah Kegiatan" menu />
      <Box p={20}>
        <Box>
          {
            (roleLogin.get() == "supadmin") && (
              <Select
                placeholder="Grup"
                label="Grup"
                size="md"
                styles={{
                  input: {
                    border: `1px solid ${"#D6D8F6"}`,
                    borderRadius: 10,
                  },
                }}
                required
                data={dataGroup?.map((pro: any) => ({
                  value: String(pro.id),
                  label: pro.name
                }))}
                onChange={(val) => {
                  onChooseGroup(val)
                  setTouched({ ...touched, idGroup: false })
                }}

                value={(body.idGroup == "") ? null : body.idGroup}
                onBlur={() => setTouched({ ...touched, idGroup: true })}
                error={
                  touched.idGroup && (
                    body.idGroup == "" ? "Grup Tidak Boleh Kosong" : null
                  )
                }
              />
            )
          }
          <TextInput
            label="Kegiatan"
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            mt={10}
            required withAsterisk
            placeholder="Nama Kegiatan"
            size="md"
            value={body.title}
            onChange={(e) => {
              setBody({ ...body, title: e.target.value })
              setTouched({ ...touched, title: false })
            }}
            onBlur={() => setTouched({ ...touched, title: true })}
            error={
              touched.title && (
                body.title == "" ? "Kegiatan Tidak Boleh Kosong" : null
              )
            }
          />
          <Box onClick={() => { setOpenTugas(true) }} mt={15}>
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
            mt={15}
          >
            <Text>Upload File</Text>
            <IoIosArrowDropright size={25} />
          </Group>
          <Box onClick={() => { onToChooseAnggota() }} mt={15}>
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text>Pilih Anggota</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
        </Box>
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
          size="lg"
          radius={30}
          fullWidth
          onClick={() => {
            if (
              body.title !== "" &&
              body.idGroup !== ""
            ) {
              setModal(true)
            } else {
              toast.error("Mohon lengkapi data terlebih dahulu");
            }
          }}>
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
          >
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
          </Dropzone>
          <Box onClick={() => router.push("/project/create?page=file-save")}>
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


      <LayoutModal loading={loadingModal} opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }else{
            setModal(false)
          }
          
        }} />
    </Box >
  );
}

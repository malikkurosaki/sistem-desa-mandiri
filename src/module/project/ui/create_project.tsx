"use client";
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { Avatar, Box, Button, Center, Flex, Group, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { BsFiletypeCsv } from "react-icons/bs";
import ResultsDateAndTask from "./results_date-and_task";
import ResultsFile from "./results_file";
import LayoutModal from "@/module/_global/layout/layout_modal";
import toast from "react-hot-toast";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { funGetUserByCookies } from "@/module/auth";
import { useShallowEffect } from "@mantine/hooks";
import { useHookstate } from "@hookstate/core";
import { globalMemberProject } from "../lib/val_project";
import ViewDateEndTask from "./create_date_end_task";
import { IFormDateProject, IFormMemberProject, IListFileTaskProject } from "../lib/type_project";
import CreateUsersProject from "./create_users_project";
import { FaTrash } from "react-icons/fa6";
import { Dropzone } from "@mantine/dropzone";
import _ from "lodash";
import { funCreateProject } from "../lib/api_project";

export default function CreateProject() {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDrawerFile, setOpenDrawerFile] = useState(false)
  const [openDrawerTask, setOpenDrawerTask] = useState(false)
  const [isModal, setModal] = useState(false)
  const [dataGroup, setDataGroup] = useState<IDataGroup[]>([]);
  const [roleUser, setRoleUser] = useState<any>("")
  const [isChooseAnggota, setChooseAnggota] = useState(false)
  const member = useHookstate(globalMemberProject)
  const memberValue = member.get() as IFormMemberProject[]
  const [openTugas, setOpenTugas] = useState(false)
  const [dataTask, setDataTask] = useState<IFormDateProject[]>([])
  const openRef = useRef<() => void>(null)
  const [fileForm, setFileForm] = useState<FormData[]>([])
  const [listFile, setListFile] = useState<IListFileTaskProject[]>([])
  const [indexDelFile, setIndexDelFile] = useState<number>(0)
  const [indexDelTask, setIndexDelTask] = useState<number>(0)
  const [body, setBody] = useState<any>({
    idGroup: "",
    title: "",
    desc: "",
  });

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

    const loadUser = await funGetUserByCookies();
    setRoleUser(loadUser.idUserRole)
  }

  function onToChooseAnggota() {
    if (roleUser == "supadmin" && body.idGroup == "")
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
      const response = await funCreateProject({ title: body.title, idGroup: body.idGroup, task: dataTask, file: fileForm, member: memberValue })

      if (response.success) {
        toast.success(response.message)
        setBody({
          idGroup: "",
          title: "",
          desc: "",
        })
        member.set([])
        setFileForm([])
        setListFile([])
        setDataTask([])
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal menambahkan tugas divisi, coba lagi nanti");
    }
  }



  if (openTugas) return <ViewDateEndTask onClose={(val) => {
    setDataTask([...dataTask, val])
    setOpenTugas(false)
  }} />;

  if (isChooseAnggota) return <CreateUsersProject grup={body.idGroup} onClose={() => { setChooseAnggota(false) }} />


  return (
    <Box>
      <LayoutNavbarNew back="/project" title="tambah proyek" menu />
      <Box p={20}>
        <Stack>
          {
            (roleUser == "supadmin") && (
              <Select
                placeholder="Grup"
                label="Grup"
                size="md"
                required
                radius={40}
                data={dataGroup?.map((pro: any) => ({
                  value: String(pro.id),
                  label: pro.name
                }))}
                onChange={(val) => {
                  onChooseGroup(val)
                }}

                value={(body.idGroup=="")?null:body.idGroup}
              />
            )
          }
          <TextInput
            label="Proyek"
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            required withAsterisk
            placeholder="Nama Proyek"
            size="md"
            value={body.title}
            onChange={(e) => setBody({ ...body, title: e.target.value })}
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
            onClick={() => setOpenDrawer(true)}
          >
            <Text>Upload File</Text>
            <IoIosArrowDropright size={25} />
          </Group>
          <Box onClick={() => { onToChooseAnggota() }}>
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
        </Stack>
        {
          dataTask.length > 0 &&
          <Box pt={20}>
            <Text fw={'bold'} c={WARNA.biruTua}>Tanggal & Tugas</Text>
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
            <Text fw={'bold'} c={WARNA.biruTua}>File</Text>
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
              <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
              <Text c={WARNA.biruTua}>Total {member.length} Anggota</Text>
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
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        mt={20}
                        key={i}
                      >
                        <Group>
                          <Avatar src={"v.image"} alt="it's me" size="lg" />
                          <Box>
                            <Text c={WARNA.biruTua} fw={"bold"}>
                              {v.name}
                            </Text>
                          </Box>
                        </Group>
                        <Text c={WARNA.biruTua} fw={"bold"}>
                          Anggota
                        </Text>
                      </Flex>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        }

        <Box mt="xl">
          <Button color="white" bg={WARNA.biruTua} size="lg" radius={30} fullWidth onClick={() => setModal(true)}>
            Simpan
          </Button>
        </Box>
      </Box>



      {/* Drawer pilih file */}
      <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={"Pilih File"}
      >
        <Flex justify={"space-around"}>
          <Dropzone
            openRef={openRef}
            onDrop={async (files) => {
              if (!files || _.isEmpty(files))
                return toast.error('Tidak ada file yang dipilih')
              const fd = new FormData();
              fd.append("file", files[0]);
              setFileForm([...fileForm, fd])
              setListFile([...listFile, { name: files[0].name, extension: files[0].type.split("/")[1] }])
            }}
            activateOnClick={false}
            maxSize={3 * 1024 ** 2}
            accept={['text/csv', 'image/png', 'image/jpeg', 'image/heic', 'application/pdf']}
            onReject={(files) => {
              return toast.error('File yang diizinkan: .csv, .png, .jpg, .heic, .pdf dengan ukuran maksimal 3 MB')
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
      </LayoutDrawer>



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
                <FaTrash size={30} color={WARNA.biruTua} />
              </Box>
              <Box>
                <Text c={WARNA.biruTua} ta='center'>Hapus File</Text>
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
                <FaTrash size={30} color={WARNA.biruTua} />
              </Box>
              <Box>
                <Text c={WARNA.biruTua} ta='center'>Hapus Tugas</Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Stack>
      </LayoutDrawer>


      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setModal(false)
        }} />
    </Box >
  );
}

"use client";
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { Avatar, Box, Button, Center, Flex, Group, Input, rem, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { BsFiletypeCsv } from "react-icons/bs";
import CreateUsersProject from "./create_users_project";
import ResultsDateAndTask from "./results_date-and_task";
import ResultsFile from "./results_file";
import { useHookstate } from "@hookstate/core";
import { globalMemberTask } from "../lib/val_task";
import ViewDateEndTask from "./create_date_end_task";
import { IFormDateTask, IFormMemberTask, IListFileTask } from "../lib/type_task";
import { Dropzone } from '@mantine/dropzone';
import toast from "react-hot-toast";
import _ from "lodash";
import { FaTrash } from "react-icons/fa6";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funCreateTask } from "../lib/api_task";

export default function CreateTask() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [openDrawer, setOpenDrawer] = useState(false)
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
  const [title, setTitle] = useState("")
  const [touched, setTouched] = useState({
    title: false,
    task: false,
    member: false
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


  async function onSubmit() {
    try {
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
        toast.success(response.message)
        setTitle("")
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
            placeholder="Nama Tugas"
            size="md"
            label="Judul Tugas"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setTouched({ ...touched, title: false })
            }}
            onBlur={() => setTouched({ ...touched, title: true })}
            required
            error={
              touched.title && (
                title == "" ? "Nama Tidak Boleh Kosong" : null
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
            onClick={() => setOpenDrawer(true)}
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
          <Box pt={30} mb={100}>
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
                          <Avatar src={`/api/file/img?cat=user&file=${v.img}`} alt="it's me" size="lg" />
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


      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${WARNA.bgWhite}`,
      }}>
        <Button
          color="white"
          bg={WARNA.biruTua}
          size="lg" radius={30}
          fullWidth
          onClick={() => {
            if (
              title !== ""
            ) {
              setOpenModal(true)
            } else {
              toast.error("Semua form harus diisi")
            }
          }}>
          Simpan
        </Button>
      </Box>



      {/* Drawer pilih file */}
      <LayoutDrawer
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
          {/* <Box onClick={() => router.push("/task/create?page=file-save")}>
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
          </Box> */}
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




      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
    </Box >
  );
}

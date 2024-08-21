'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Button, Checkbox, Divider, Flex, Grid, Group, Modal, Select, SimpleGrid, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FcDocument, FcFolder, FcImageFile } from 'react-icons/fc';
import { BsDownload, BsListCheck } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { CgRename } from "react-icons/cg";
import { LuShare2 } from 'react-icons/lu';
import { MdClose, MdOutlineMoreHoriz } from 'react-icons/md';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DrawerMenuDocumentDivision from './drawer_menu_document_division';
import DrawerMore from './drawer_more';
import { funGetDivisionById } from '@/module/division_new';
import { useShallowEffect } from '@mantine/hooks';
import { funDeleteDocument, funGetAllDocument, funRenameDocument } from '../lib/api_document';
import { IDataDocument } from '../lib/type_document';
import { useHookstate } from '@hookstate/core';
import { globalRefreshDocument } from '../lib/val_document';
import { RiListCheck } from 'react-icons/ri';

export default function NavbarDocumentDivision() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [rename, setRename] = useState(false)
  const [share, setShare] = useState(false)
  const [more, setMore] = useState(false)
  const searchParams = useSearchParams()
  const path = searchParams.get('path')
  const [dataDocument, setDataDocument] = useState<IDataDocument[]>([])
  const refresh = useHookstate(globalRefreshDocument)
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [selectAll, setSelectAll] = useState(false)
  const [dariSelectAll, setDariSelectAll] = useState(false)
  const [bodyRename, setBodyRename] = useState({
    id: '',
    name: '',
    path: '',
    idDivision: param.id,
    extension: ''
  })

  const handleCheckboxChange = (index: number) => {
    setDariSelectAll(false)
    if (selectedFiles.some((i: any) => i.id == dataDocument[index].id)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.id != dataDocument[index].id))
    } else {
      setSelectedFiles([
        ...selectedFiles,
        {
          id: dataDocument[index].id,
          name: dataDocument[index].name,
          path: dataDocument[index].path,
          extension: dataDocument[index].extension
        }
      ])
    }

  };

  function cek() {
    if (selectedFiles.length == dataDocument.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }

  const handleSelectAll = () => {
    if (!selectAll) {
      setDariSelectAll(false)
      for (let index = 0; index < dataDocument.length; index++) {
        if (!selectedFiles.some((i: any) => i.id == dataDocument[index].id)) {
          const newArr = {
            id: dataDocument[index].id,
            name: dataDocument[index].name,
            path: dataDocument[index].path,
            extension: dataDocument[index].extension
          }
          setSelectedFiles((selectedFiles: any) => [...selectedFiles, newArr])
        }
      }
    } else {
      setDariSelectAll(true)
      setSelectedFiles([]);
    }

  };

  const handleBatal = () => {
    setSelectedFiles([])
    setSelectAll(false)
    setDariSelectAll(false)
  }


  async function onConfirmDelete(val: boolean) {
    if (val) {
      try {
        const respon = await funDeleteDocument(selectedFiles)
        if (respon.success) {
          getOneData()
        } else {
          toast.error(respon.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Gagal menghapus item, coba lagi nanti")
      }

      handleBatal()
    }

    setIsDelete(false)
  }



  async function onRenameSubmit() {
    try {
      const res = await funRenameDocument(bodyRename)
      if (res.success) {
        getOneData()

      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal mengganti nama item, coba lagi nanti")
    }

    setSelectedFiles([])
    setDariSelectAll(false)
    setRename(false)
  }

  async function getOneData() {
    try {
      const respon = await funGetAllDocument("?division=" + param.id + "&path=" + path);
      if (respon.success) {
        setDataDocument(respon.data);
      } else {
        toast.error(respon.message);
      }

      const res = await funGetDivisionById(param.id);
      if (res.success) {
        setName(res.data.division.name);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    }
  }

  function resetRefresh() {
    refresh.set(false)
    setOpen(false)
  }

  useShallowEffect(() => {
    cek()
  }, [selectedFiles])

  useShallowEffect(() => {
    getOneData()
    resetRefresh()
  }, [param.id, path, refresh.get()])


  function onChooseRename() {
    setBodyRename({
      ...bodyRename,
      id: selectedFiles[0].id,
      name: selectedFiles[0].name,
      path: selectedFiles[0].path,
      extension: selectedFiles[0].extension,

    })
    setRename(true)
  }

  return (
    <Box>
      {(selectedFiles.length > 0 || dariSelectAll) && (
        <>
          <Box h={90} w={{ base: "100%", md: "38.2%" }} bg={WARNA.biruTua} pos={'fixed'} top={0} style={{
            zIndex: 999,
          }}>
            <Flex justify={'space-between'} ml={30} mr={30} align={'center'} h={"100%"}>
              <ActionIcon variant="transparent" aria-label="Settings" onClick={() => handleBatal()}>
                <MdClose size={25} color='white' />
              </ActionIcon>
              <Text fz={15} c={'white'}>{(selectedFiles.length > 0) ? selectedFiles.length + " item terpilih" : "Pilih Item"}</Text>
              <ActionIcon variant="transparent" aria-label="Settings" onClick={() => handleSelectAll()}>
                {
                  (selectAll) ?
                    <RiListCheck size={25} color='white' /> :
                    <BsListCheck size={25} color='white' />
                }

              </ActionIcon>
            </Flex>
          </Box>
          <Box h={70} w={{ base: "100%", md: "38.2%" }} bg={WARNA.biruTua} pos={'fixed'} bottom={0} style={{
            zIndex: 999,
          }}>
            <Flex justify={"center"} align={"center"} h={"100%"} w={"100%"}>
              <SimpleGrid cols={{ base: 5, sm: 5, lg: 5 }}>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                  <BsDownload size={20} color={(selectedFiles.length > 0) ? 'white' : 'grey'} />
                  <Text fz={12} c={(selectedFiles.length > 0) ? 'white' : 'grey'}>Unduh</Text>
                </Flex>
                <Flex onClick={() => setIsDelete(true)} justify={'center'} align={'center'} direction={'column'}>
                  <AiOutlineDelete size={20} color={(selectedFiles.length > 0) ? 'white' : 'grey'} />
                  <Text fz={12} c={(selectedFiles.length > 0) ? 'white' : 'grey'}>Hapus</Text>
                </Flex>
                <Flex onClick={() => {
                  if (selectedFiles.length == 1) {
                    onChooseRename()
                  }
                }} justify={'center'} align={'center'} direction={'column'}>
                  <CgRename size={20} color={(selectedFiles.length == 1) ? 'white' : 'grey'} />
                  <Text fz={12} c={(selectedFiles.length == 1) ? 'white' : 'grey'}>Ganti Nama</Text>
                </Flex>
                <Flex onClick={() => setShare(true)} justify={'center'} align={'center'} direction={'column'}>
                  <LuShare2 size={20} color={(selectedFiles.length > 0) ? 'white' : 'grey'} />
                  <Text fz={12} c={(selectedFiles.length > 0) ? 'white' : 'grey'}>Bagikan</Text>
                </Flex>
                <Flex onClick={() => setMore(true)} justify={'center'} align={'center'} direction={'column'}>
                  <MdOutlineMoreHoriz size={20} color={(selectedFiles.length > 0) ? 'white' : 'grey'} />
                  <Text fz={12} c={(selectedFiles.length > 0) ? 'white' : 'grey'}>Lainnya</Text>
                </Flex>
              </SimpleGrid>
            </Flex>
          </Box>
        </>
      )}

      <LayoutNavbarNew back='' title={name}
        menu={
          <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />


      <Box>
        <Box p={20} pb={60}>
          {dataDocument.map((v, i) => {
            const isSelected = selectedFiles.some((i: any) => i?.id == v.id);
            return (
              <Box key={i}>
                <Box mt={10} mb={10}>
                  <Grid align='center' >
                    <Grid.Col span={10}
                      onClick={() => {
                        if (v.category == "FOLDER")
                          router.push('?path=' + v.id)
                      }}
                    >
                      <Group gap={20}>
                        <Box>
                          {
                            (v.category == "FOLDER") ?
                              <FcFolder size={60} /> :
                              (v.extension == "pdf" || v.extension == "csv") ?
                                <FcDocument size={60} /> :
                                <FcImageFile size={60} />
                          }
                        </Box>
                        <Flex direction={'column'}>
                          <Text>{(v.category == "FOLDER") ? v.name : v.name + '.' + v.extension}</Text>
                          <Text fz={10}>{v.updatedAt}</Text>
                        </Flex>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Group justify='flex-end'>
                        <Checkbox
                          color="teal"
                          radius="lg"
                          size="md"
                          checked={isSelected}
                          onChange={() => handleCheckboxChange(i)}
                        />
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Box>
                <Divider size="xs" />
              </Box>
            )
          })}
        </Box>
      </Box>



      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerMenuDocumentDivision />
      </LayoutDrawer>



      {/* MODAL KONFIRMASI DELETE */}
      <LayoutModal opened={isDelete} onClose={() => setIsDelete(false)}
        description="Apakah Anda yakin ingin menghapus item?"
        onYes={(val) => {
          onConfirmDelete(val)
        }} />




      {/* MODAL RENAME */}
      <Modal styles={{
        body: {
          borderRadius: 20
        },
        content: {
          borderRadius: 20,
          border: `2px solid ${"#828AFC"}`
        }
      }} opened={rename} onClose={() => setRename(false)} centered withCloseButton={false}>
        <Box p={20}>
          <Text ta={"center"} fw={"bold"}>Ganti Nama Item</Text>
          <Box mt={20} mb={20}>
            <TextInput
              styles={{
                input: {
                  color: WARNA.biruTua,
                  borderRadius: '#828AFC',
                  borderColor: '#828AFC',
                },
              }}
              size="md"
              radius={10}
              placeholder="Nama item"
              value={bodyRename.name}
              onChange={(e) => setBodyRename({ ...bodyRename, name: e.target.value })}
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color='#969494' onClick={() => setRename(false)}>Batalkan</Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color={WARNA.biruTua} onClick={(val) => onRenameSubmit()}>Simpan</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>



      <LayoutDrawer opened={share} title={'Bagikan'} onClose={() => setShare(false)} size='lg'>
        <Box pt={10}>
          <Select
            styles={{
              input: {
                color: WARNA.biruTua,
                borderRadius: WARNA.biruTua,
                borderColor: WARNA.biruTua,
              },
            }}
            size="lg"
            radius={10}
            placeholder="Pilih Divisi"
          />
          <Box h={90} pos={"fixed"} bottom={0} w={{ base: "92%", md: "94%" }} style={{
            zIndex: 999
          }}>
            <Box>
              <Button
                c={"white"}
                bg={WARNA.biruTua}
                size="lg"
                radius={30}
                fullWidth
                onClick={() => ''}
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </Box>
      </LayoutDrawer>
      <LayoutDrawer opened={more} title={''} onClose={() => setMore(false)}>
        <DrawerMore />
      </LayoutDrawer>
    </Box>
  );
}

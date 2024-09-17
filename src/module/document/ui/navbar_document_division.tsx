'use client'
import { LayoutDrawer, LayoutModalViewFile, LayoutNavbarNew, TEMA } from '@/module/_global';
import { ActionIcon, Anchor, Box, Breadcrumbs, Button, Checkbox, Divider, Flex, Grid, Group, Indicator, Modal, rem, Select, SimpleGrid, Text, TextInput } from '@mantine/core';
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
import { useMediaQuery, useShallowEffect } from '@mantine/hooks';
import { funDeleteDocument, funGetAllDocument, funRenameDocument } from '../lib/api_document';
import { IDataDocument, IJalurItem } from '../lib/type_document';
import { useHookstate } from '@hookstate/core';
import { globalRefreshDocument } from '../lib/val_document';
import { RiListCheck } from 'react-icons/ri';
import { GoChevronRight } from 'react-icons/go';
import DrawerShareDocument from './drawer_share_document';
import { FaShare } from 'react-icons/fa6';

export default function NavbarDocumentDivision() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [isOpenModalView, setOpenModalView] = useState(false)
  const [isExtension, setExtension] = useState('')
  const [idStorage, setIdStorage] = useState('')
  const [name, setName] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [rename, setRename] = useState(false)
  const [share, setShare] = useState(false)
  const [more, setMore] = useState(false)
  const [shareSelected, setShareSelected] = useState(false)
  const [copyAllowed, setCopyAllowed] = useState(true)
  const searchParams = useSearchParams()
  const path = searchParams.get('path')
  const [dataDocument, setDataDocument] = useState<IDataDocument[]>([])
  const [dataJalur, setDataJalur] = useState<IJalurItem[]>([])
  const refresh = useHookstate(globalRefreshDocument)
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [selectAll, setSelectAll] = useState(false)
  const [dariSelectAll, setDariSelectAll] = useState(false)
  const isMobile = useMediaQuery('(max-width: 369px)')
  const tema = useHookstate(TEMA)
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
          extension: dataDocument[index].extension,
          category: dataDocument[index].category,
          share: dataDocument[index].share,
          idStorage: dataDocument[index].idStorage
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

    const shareSelected = selectedFiles.some((i: any) => i?.share == true)
    if (shareSelected) {
      setShareSelected(true)
    } else {
      setShareSelected(false)
    }

    const cek = selectedFiles.some((i: any) => i?.category == 'FOLDER')
    if (cek || shareSelected || selectedFiles.length > 1) {
      setCopyAllowed(false)
    } else {
      setCopyAllowed(true)
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
            extension: dataDocument[index].extension,
            category: dataDocument[index].category,
            share: dataDocument[index].share,
            idStorage: dataDocument[index].idStorage
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
        console.error(error)
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
      console.error(error)
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
        setDataJalur(respon.jalur);
      } else {
        toast.error(respon.message);
        setDataDocument([]);
        setDataJalur([]);
      }

      const res = await funGetDivisionById(param.id);
      if (res.success) {
        setName(res.data.division.name);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan item, coba lagi nanti");
    }
  }

  function resetRefresh() {
    refresh.set(false)
    setOpen(false)
    setMore(false)
    setShare(false)
    handleBatal()
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

  const onDownload = async () => {
    try {
      const fileUrl = `https://wibu-storage.wibudev.com/api/files/${selectedFiles[0].idStorage}`;
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a link element, use Blob URL
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `${selectedFiles[0].name}.${selectedFiles[0].extension}`; // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box>
      {(selectedFiles.length > 0 || dariSelectAll) && (
        <>
          <Box h={90} bg={tema.get().utama} pos={'fixed'} top={0} w={"100%"} style={{
            maxWidth: rem(550),
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
          <Box h={70} bg={tema.get().utama} pos={'fixed'} bottom={0} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
          }}>
            <Flex justify={"center"} align={"center"} h={"100%"} w={"100%"}>
              <SimpleGrid cols={{ base: 5, sm: 5, lg: 5 }} spacing="xs">
                <Flex justify={'center'} align={'center'} direction={'column'}
                  onClick={() => {
                    if ((selectedFiles.length > 0 && copyAllowed)) {
                      onDownload()
                    }
                  }}>
                  <BsDownload size={20} color={(selectedFiles.length > 0 && copyAllowed) ? 'white' : '#656060'} />
                  <Text fz={12} ta={"center"} c={(selectedFiles.length > 0 && copyAllowed) ? 'white' : '#656060'}>Unduh</Text>
                </Flex>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="delete"
                    onClick={(selectedFiles.length > 0 && !shareSelected) ? () => setIsDelete(true) : undefined}
                  >
                    <AiOutlineDelete size={20} color={(selectedFiles.length > 0 && !shareSelected) ? 'white' : '#656060'} />
                  </ActionIcon>
                  <Text fz={12} ta={"center"} c={(selectedFiles.length > 0 && !shareSelected) ? 'white' : '#656060'}>Hapus</Text>
                </Flex>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="rename"
                    onClick={
                      (selectedFiles.length == 1 && !shareSelected) ? () => onChooseRename() : undefined
                    }
                  >
                    <CgRename size={20} color={(selectedFiles.length == 1 && !shareSelected) ? 'white' : '#656060'} />
                  </ActionIcon>
                  <Text fz={12} ta={"center"} c={(selectedFiles.length == 1 && !shareSelected) ? 'white' : '#656060'}>Ganti Nama</Text>
                </Flex>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="share"
                    onClick={
                      (selectedFiles.length > 0 && !shareSelected) ? () => setShare(true) : undefined
                    }
                  >
                    <LuShare2 size={20} color={(selectedFiles.length > 0 && !shareSelected) ? 'white' : '#656060'} />
                  </ActionIcon>
                  <Text fz={12} ta={"center"} c={(selectedFiles.length > 0 && !shareSelected) ? 'white' : '#656060'}>Bagikan</Text>
                </Flex>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                  <ActionIcon
                    variant="subtle"
                    aria-label="share"
                    onClick={
                      (selectedFiles.length > 0 && !shareSelected) ? () => setMore(true) : undefined
                    }
                  >
                    <MdOutlineMoreHoriz size={20} color={(selectedFiles.length > 0 && !shareSelected) ? 'white' : '#656060'} />
                  </ActionIcon>
                  <Text fz={12} ta={"center"} c={(selectedFiles.length > 0 && !shareSelected) ? 'white' : '#656060'}>Lainnya</Text>
                </Flex>
              </SimpleGrid>
            </Flex>
          </Box>
        </>
      )}

      <LayoutNavbarNew back={`/division/${param.id}/`} title={name}
        menu={
          <ActionIcon onClick={() => setOpen(true)} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
            <HiMenu size={20} color='white' />
          </ActionIcon>
        }
      />
      <Box>
        <Box p={20} pb={100}>
          <Box>
            <Breadcrumbs separator={<GoChevronRight />} separatorMargin="md" mt="xs" style={{ cursor: 'pointer' }}>
              {
                dataJalur.map((v, i) => {
                  return (
                    <Text onClick={() => router.push('?path=' + v.id)} key={i}>
                      {v.name}
                    </Text>
                  )
                })
              }
            </Breadcrumbs>
          </Box>
          {dataDocument.map((v, i) => {
            const isSelected = selectedFiles.some((i: any) => i?.id == v.id);
            return (
              <Box key={i}>
                <Box mt={10} mb={10}>
                  <Grid align='center'

                  >
                    <Grid.Col span={2}
                      onClick={() => {
                        if (v.category == "FOLDER" && selectedFiles.length == 0 && !dariSelectAll) {
                          router.push('?path=' + v.id)
                        } else if (v.category == "FILE" && selectedFiles.length == 0 && !dariSelectAll) {
                          setExtension(v.extension)
                          setIdStorage(v.idStorage)
                          setOpenModalView(true)
                        }

                      }}
                    >
                      <Group>
                        <Box>
                          {
                            (v.share) ?
                              <Indicator offset={15} withBorder inline color={tema.get().bgIcon} position="bottom-end" label={<FaShare />} size={25}>
                                {
                                  (v.category == "FOLDER") ?
                                    <FcFolder size={isMobile ? 40 : 50} /> :
                                    (v.extension == "pdf" || v.extension == "csv") ?
                                      <FcDocument size={isMobile ? 40 : 50} /> :
                                      <FcImageFile size={isMobile ? 40 : 50} />
                                }
                              </Indicator>
                              :
                              <>
                                {
                                  (v.category == "FOLDER") ?
                                    <FcFolder size={isMobile ? 40 : 50} /> :
                                    (v.extension == "pdf" || v.extension == "csv") ?
                                      <FcDocument size={isMobile ? 40 : 50} /> :
                                      <FcImageFile size={isMobile ? 40 : 50} />
                                }
                              </>

                          }

                        </Box>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={10}>
                      <Group justify='space-between' align='center'>
                        <Flex direction={'column'}
                          onClick={() => {
                            if (v.category == "FOLDER" && selectedFiles.length == 0 && !dariSelectAll) {
                              router.push('?path=' + v.id)
                            } else if (v.category == "FILE" && selectedFiles.length == 0 && !dariSelectAll) {
                              setExtension(v.extension)
                              setIdStorage(v.idStorage)
                              setOpenModalView(true)
                            }

                          }}
                        >
                          <Box w={{
                            base: isMobile ? 200 : 230,
                            xl: 380,
                            md: 380,
                            sm: 380,
                            xs: 380
                          }}>
                            <Text lineClamp={1}>{(v.category == "FOLDER") ? v.name : v.name + '.' + v.extension}</Text>
                            <Text fz={10}>{v.updatedAt}</Text>
                          </Box>
                        </Flex>
                        <Checkbox
                          color={tema.get().utama}
                          radius="lg"
                          size={isMobile ? "sm" : "md"}
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
                  color: tema.get().utama,
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
              <Button variant="subtle" fullWidth color={tema.get().utama} onClick={(val) => onRenameSubmit()}>Simpan</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>



      <LayoutDrawer opened={share} title={'Bagikan'} onClose={() => setShare(false)} size='lg'>
        <DrawerShareDocument data={selectedFiles} />
      </LayoutDrawer>



      <LayoutDrawer opened={more} title={''} onClose={() => setMore(false)}>
        <DrawerMore data={selectedFiles} />
      </LayoutDrawer>


      <LayoutModalViewFile opened={isOpenModalView} onClose={() => setOpenModalView(false)} file={idStorage} extension={isExtension} fitur='dokumen' />
    </Box>
  );
}

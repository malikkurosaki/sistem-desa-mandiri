'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Button, Checkbox, Divider, Flex, Grid, Group, Modal, Select, SimpleGrid, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FcDocument, FcFolder, FcImageFile } from 'react-icons/fc';
import { BsDownload } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { CgRename } from "react-icons/cg";
import { LuShare2 } from 'react-icons/lu';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DrawerMenuDocumentDivision from './drawer_menu_document_division';
import DrawerMore from './drawer_more';
import { funGetDivisionById } from '@/module/division_new';
import { useShallowEffect } from '@mantine/hooks';
import { funGetAllDocument } from '../lib/api_document';
import { IDataDocument } from '../lib/type_document';
import { useHookstate } from '@hookstate/core';
import { globalRefreshDocument } from '../lib/val_document';

export default function NavbarDocumentDivision() {
  const [isChecked, setIsChecked] = useState(false);
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data dihapus");
    }
    setIsDelete(false)
  }
  function onEdit(val: boolean) {
    if (val) {
      toast.success("Sukses! Edit Data");
    }
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
    getOneData()
    resetRefresh()
  }, [param.id, path, refresh.get()])

  return (
    <Box>
      {isChecked && (
        <>
          <Box h={90} w={{ base: "100%", md: "38.2%" }} bg={WARNA.biruTua} pos={'fixed'} top={0} style={{
            zIndex: 999,
          }}>
            <Flex justify={'space-between'} ml={30} mr={30} align={'center'} h={"100%"}>
              <Text c={'white'}>Dibatalkan</Text>
              <Text c={'white'}>Pilih Semua</Text>
            </Flex>
          </Box>
          <Box h={70} w={{ base: "100%", md: "38.2%" }} bg={WARNA.biruTua} pos={'fixed'} bottom={0} style={{
            zIndex: 999,
          }}>
            <Flex justify={"center"} align={"center"} h={"100%"} w={"100%"}>
              <SimpleGrid cols={{ base: 5, sm: 5, lg: 5 }}>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                  <BsDownload size={20} color='white' />
                  <Text fz={12} c={'white'}>Unduh</Text>
                </Flex>
                <Flex onClick={() => setIsDelete(true)} justify={'center'} align={'center'} direction={'column'}>
                  <AiOutlineDelete size={20} color='white' />
                  <Text fz={12} c={'white'}>Hapus</Text>
                </Flex>
                <Flex onClick={() => setRename(true)} justify={'center'} align={'center'} direction={'column'}>
                  <CgRename size={20} color='white' />
                  <Text fz={12} c={'white'}>Ganti Name</Text>
                </Flex>
                <Flex onClick={() => setShare(true)} justify={'center'} align={'center'} direction={'column'}>
                  <LuShare2 size={20} color='white' />
                  <Text fz={12} c={'white'}>Bagikan</Text>
                </Flex>
                <Flex onClick={() => setMore(true)} justify={'center'} align={'center'} direction={'column'}>
                  <MdOutlineMoreHoriz size={20} color='white' />
                  <Text fz={12} c={'white'}>Lainnya</Text>
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
                          checked={isChecked}
                          onChange={handleCheckboxChange}
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


      <LayoutModal opened={isDelete} onClose={() => setIsDelete(false)}
        description="Apakah Anda yakin ingin menghapus data?"
        onYes={(val) => { onTrue(val) }} />
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
          <Text ta={"center"} fw={"bold"}>Edit Folder</Text>
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
              placeholder="Buat Folder Baru"
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color='#969494' onClick={() => setRename(false)}>Batalkan</Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color={WARNA.biruTua} onClick={(val) => onEdit(true)}>Edit</Button>
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

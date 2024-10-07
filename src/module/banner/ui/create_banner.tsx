'use client'
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Group, Image, Paper, rem, Text, TextInput } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { funCreateBanner } from '../lib/api_banner';
import { title } from 'process';

function CreateBanner() {
  const router = useRouter();
  const [isModal, setModal] = useState(false);
  const tema = useHookstate(TEMA)
  const [loadingKonfirmasi, setLoadingKonfirmasi] = useState(false)
  const [listData, setListData] = useState({
    title: "",
    image: ""

  });
  const [imgForm, setImgForm] = useState<any>()
  const openRef = useRef<() => void>(null)
  const [img, setIMG] = useState<any | null>()
  const [touched, setTouched] = useState({
    title: false,
    image: false
  })

  
  function onValidation(kategori: string, val: any) {
    if (kategori == 'title') {
      setListData({ ...listData, title: val })
      if (val === "") {
        setTouched({ ...touched, title: true })
      } else {
        setTouched({ ...touched, title: false })
      }
    } else if (kategori == 'image') {
      if (imgForm) {
        setTouched({ ...touched, image: false })
      } else {
        setTouched({ ...touched, image: true })
      }
    } 
  }
  
  
  async function onSubmit(val: boolean) {
    if (!imgForm || !listData.title) {
      toast.error("Mohon lengkapi semua data");
    }
    try {
      setLoadingKonfirmasi(true)
      const fd = new FormData()
      fd.append("file", imgForm)
      fd.append("data", JSON.stringify(
        {
          title: listData.title,
          image: listData.image
        }
      ))
      const res = await funCreateBanner(fd);
      if (res.success) {
        toast.success(res.message);
        router.push('/banner')
      } else {
        toast.error(res.message);
      }
      setModal(false);
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoadingKonfirmasi(false)
      setModal(false);
    }
  }

  // async function loadData() {
  //   const
  // }

  return (
    <Box>
      <LayoutNavbarNew back='/banner' title='Tambah Banner' menu />
      <Box p={20}>
        <Box>
          <Paper withBorder radius={20}>
            <Dropzone
              openRef={openRef}
              onDrop={async (files) => {
                if (!files || _.isEmpty(files))
                  return toast.error('Tidak ada gambar yang dipilih')
                const file = files[0]
                setImgForm(file)
                const buffer = URL.createObjectURL(new Blob([new Uint8Array(await files[0].arrayBuffer())]))
                setIMG(buffer)
                onValidation('image', files[0])
              }}
              activateOnClick={false}
              maxSize={1 * 1024 ** 2}
              accept={['image/png', 'imagfe/jpeg', 'image/heic']}
              onReject={(files) => {
                return toast.error('File yang diizinkan: .png, .jpg, dan .heic  dengan ukuran maksimal 1 MB')
              }}
              onClick={() => openRef.current?.()}
            >

              {
                img ?
                  <Image radius="md" src={img} alt='' />
                  :
                  <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto
                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Idle>

                    <div>
                      <Text size="xl" inline>
                        Klik Untuk Upload Image
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        Ukuran Foto Tidak Boleh Lebih Dari 1MB
                      </Text>
                    </div>
                  </Group>
              }

            </Dropzone>
          </Paper>
          <Box>
            <TextInput
              mt={10}
              label={<Text >Judul Banner</Text>}
              value={listData.title}
              placeholder='Judul Banner'
              onChange={(e) => {
                setListData({ ...listData, title: e.target.value })
                onValidation('title', e.target.value)
              }}
              styles={{
                input: {
                  border: `1px solid ${touched.title ? 'red' : "#D6D8F6"}`,
                  borderRadius: 10,
                },
              }}
              
              
            />
          </Box>
          <Box pos={"fixed"} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(510),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`
          }}>
            <Button
              size='lg'
              color='white'
              bg={tema.get().utama} radius={30} fullWidth
              onClick={() => {  
                if (touched.title || touched.image) {
                  toast.error("Mohon Isi Semua Data")
                } else {
                  setModal(true)
                }
              }}

            >Simpan</Button>
          </Box>
        </Box>
      </Box>
      <LayoutModal
        loading={loadingKonfirmasi}
        opened={isModal}
        onClose={() => setModal(false)}
        description="Apakah anda yakin ingin menambahkan banner ini?"
        onYes={(val) => {
          if (val) {
            onSubmit(val);
          } else {
            setModal(false);
          }
        }}

      />
    </Box>
  );
}

export default CreateBanner;

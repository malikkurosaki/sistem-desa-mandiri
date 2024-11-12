'use client'
import { LayoutNavbarNew, TEMA, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Image, Paper, rem, Text, TextInput } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useShallowEffect } from '@mantine/hooks';
import _ from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { funEditBanner, funGetOneBanner } from '../lib/api_banner';
import { IEditDataBanner } from '../lib/type_banner';


export default function EditBanner() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const tema = useHookstate(TEMA)
  const [isModal, setModal] = useState(false)
  const [data, setData] = useState<IEditDataBanner>({
    id: "",
    title: "",
    extension: "",
    image: "",
  });
  const openRef = useRef<() => void>(null)
  const [img, setIMG] = useState<any | null>()
  const [imgForm, setImgForm] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({
    title: false,
    image: false
  })


  function onValidation(kategori: string, val: any) {
    if (kategori == 'title') {
      setData({ ...data, title: val })
      if (val === "") {
        setTouched({ ...touched, title: true })
      } else {
        setTouched({ ...touched, title: false })
      }
    } else if (kategori == 'image') {
      if (imgForm) {
        setTouched({ ...touched, image: true })
      } else {
        setTouched({ ...touched, image: false })
      }
    }
  }

  function onCheck() {
    if (Object.values(touched).some((v) => v == true))
      return false
    setModal(true)
  }
  
    
  async function getOneData() {
    try {
      const res = await funGetOneBanner(param.id)
      console.log(res)
      setData(res.data)
      setIMG(`https://wibu-storage.wibudev.com/api/files/${res.data.image}`)
    } catch (error) {
      console.error(error)
    }
  }

  async function onSubmit(val: boolean) {
    try {
      setLoading(true)
      const fd = new FormData()
      fd.append("file", imgForm)
      fd.append("data", JSON.stringify(
        {
          id: data.id,
          title: data.title,
          image: data.image,
          extension: data.extension
        }
      ))

      const res = await funEditBanner(param.id, fd)

      if (res.success) {
        toast.success(res.message)
        router.push('/banner')
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false)
      setModal(false)
    }
  }

  useShallowEffect(() => {
    getOneData()
  }, [])

  return (
    <Box>
      <LayoutNavbarNew back='/banner' title='Edit Banner' menu={<></>} />
      <Box p={20}>
        <Box>
          <Paper withBorder radius={20}>
            <Dropzone
              openRef={openRef}
              onDrop={async (files) => {
                if (!files || _.isEmpty(files))
                  return toast.error("Tidak Ada Gambar Yang Dipilih")
                setImgForm(files[0])
                const buffer = URL.createObjectURL(new Blob([new Uint8Array(await files[0].arrayBuffer())]))
                setIMG(buffer)
                onValidation('image', files[0])
              }}
              activateOnClick={false}
              maxSize={1 * 1024 ** 2}
              accept={['image/png', 'image/jpeg', 'image/heic']}
              onReject={(files) => {
                return toast.error('File yang diizinkan: .png, .jpg, dan .heic  dengan ukuran maksimal 1 MB')
              }}
              onClick={() => openRef.current?.()}
            >
              <Image radius={"md"} src={img} alt="" />
            </Dropzone>
          </Paper>
          <Box>
            <TextInput
              mt={10}
              label="Judul Banner"
              placeholder='Judul Banner'
              value={data.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value })
                onValidation('title', e.target.value)
              }}
              styles={{
                input: {
                  border: `1px solid ${touched.title ? 'red' : "#D6D8F6"}`,
                  borderRadius: 10,
                },
              }}
              required
              size='md'
              error={
                touched.title && (
                  data.title == "" ? "Judul Banner Tidak Boleh Kosong" : null
                )
              }
            />
          </Box>
          <Box pos={"fixed"} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(510),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`
          }}>
            <Button
              size='lg'
              c='white'
              bg={tema.get().utama}
              radius={30}
              fullWidth
              onClick={() => { onCheck() }}
            >
              Simpan
            </Button>

            <LayoutModal
              loading={loading}
              opened={isModal}
              onClose={() => setModal(false)}
              description="Apakah Anda yakin ingin mengedit banner ini?"
              onYes={(val) => {
                if (val) {
                  onSubmit(val)
                } else {
                  setModal(false)
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


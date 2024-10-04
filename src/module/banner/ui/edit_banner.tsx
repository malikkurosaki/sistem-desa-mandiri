'use client'
import { LayoutNavbarNew, TEMA, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Group, Paper, rem, Text, TextInput } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';


function EditBanner(props: Partial<DropzoneProps> ) {
  const router = useRouter()
  const tema = useHookstate(TEMA)
  const param = useParams<{ id: string, detail: string }>()
  const [title, setTitle] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [imgForm, setImgForm] = useState<any>()
  const [touched, setTouched] = useState({
    title: false,
  });


  return (
    <Box>
      <LayoutNavbarNew back='/banner' title='Edit Banner' menu={<></>} />
      <Box p={20}>
        <Box>
          <Paper withBorder radius={20}>
            <Dropzone
              onDrop={(files) => console.log('accepted files', files)}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...props}
            >
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

                <Box>
                  <Text size="xl" inline>
                    Upload File
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    File Tidak Boleh Melebihi 500mb
                  </Text>
                </Box>
              </Group>
            </Dropzone>
          </Paper>
          <Box>
            <TextInput
              mt={10}
              label="Judul Banner"
              placeholder='Banner'
              styles={{
                input: {
                  border: `1px solid ${"#D6D8F6"}`,
                  borderRadius: 10,
                },
              }}
              required
              size='md'
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value)
                setTouched({...touched, title: false})
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
              bg={WARNA.biruTua}
              radius={30}
              fullWidth
             >
              Simpan
            </Button>

            <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
              description="Apakah Anda yakin ingin mengedit banner ini?"
              onYes={(val) => {
    
                setOpenModal(false)
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditBanner;

'use client'
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Group, Paper, rem, Text, TextInput } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

function CreateBanner(props: Partial<DropzoneProps>) {
  const tema = useHookstate(TEMA)
  
  return (
    <Box>
      <LayoutNavbarNew back='/banner' title='Tambah Banner' menu={<></>} />
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
              label={<Text>Judul Banner</Text>}
              placeholder='Judul Banner'
              styles={{
                input: {
                  border: `1px solid ${"#D6D8F6"}`,
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
              bg={tema.get().utama} radius={30} fullWidth >Simpan</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateBanner;

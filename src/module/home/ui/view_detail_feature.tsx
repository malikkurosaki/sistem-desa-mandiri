'use client'
import { globalRole, LayoutNavbarNew, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Center, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { FaUserTag, FaUserTie } from 'react-icons/fa6';
import { HiMegaphone, HiMiniPresentationChartBar, HiMiniUserGroup } from "react-icons/hi2";
import { IoColorPalette } from 'react-icons/io5';
import { PiUsersFourFill } from "react-icons/pi";
import { RiLayoutTop2Fill } from "react-icons/ri";

export default function ViewDetailFeature() {
  const router = useRouter()
  const roleLogin = useHookstate(globalRole)
  const isMobile = useMediaQuery('(max-width: 369px)');
  const tema = useHookstate(TEMA)

  return (
    <>
      <LayoutNavbarNew back='/home' title='Fitur' menu={<></>} />
      <Box p={20}>
        <Box >
          <SimpleGrid
            cols={{ base: 4, sm: 4, lg: 4 }}
          >
            <Box onClick={() => router.push('/division')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={isMobile ? 50 : 68}
                  aria-label="Gradient action icon"
                  radius={100}
                  // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                  bg={tema.get().bgFiturHome}
                >
                  <HiMiniUserGroup size={isMobile ? 25 : 35} color={tema.get().utama} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Divisi</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/project?status=0&group=null')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={isMobile ? 50 : 68}
                  aria-label="Gradient action icon"
                  radius={100}
                  // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                  bg={tema.get().bgFiturHome}
                >
                  <HiMiniPresentationChartBar size={isMobile ? 25 : 35} color={tema.get().utama} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Kegiatan</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/announcement')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={isMobile ? 50 : 68}
                  aria-label="Gradient action icon"
                  radius={100}
                  // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                  bg={tema.get().bgFiturHome}
                >
                  <HiMegaphone size={isMobile ? 25 : 35} color={tema.get().utama} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Pengumuman</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/member')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={isMobile ? 50 : 68}
                  aria-label="Gradient action icon"
                  radius={100}
                  // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                  bg={tema.get().bgFiturHome}
                >
                  <PiUsersFourFill size={isMobile ? 25 : 35} color={tema.get().utama} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Anggota</Text>
              </Center>
            </Box>
            <Box onClick={() => router.push('/position')}>
              <Center>
                <ActionIcon variant="gradient"
                  size={isMobile ? 50 : 68}
                  aria-label="Gradient action icon"
                  radius={100}
                  // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                  bg={tema.get().bgFiturHome}
                >
                  <FaUserTie size={isMobile ? 25 : 35} color={tema.get().utama} />
                </ActionIcon>
              </Center>
              <Center>
                <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Jabatan</Text>
              </Center>
            </Box>
            {
              roleLogin.get() == "supadmin" &&
              <>
                <Box onClick={() => router.push('/group')}>
                  <Center>
                    <ActionIcon variant="gradient"
                      size={isMobile ? 50 : 68}
                      aria-label="Gradient action icon"
                      radius={100}
                      // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                      bg={tema.get().bgFiturHome}
                    >
                      <FaUserTag size={isMobile ? 25 : 35} color={tema.get().utama} />
                    </ActionIcon>
                  </Center>
                  <Center>
                    <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Grup</Text>
                  </Center>
                </Box>
                <Box onClick={() => router.push('/color-palette')}>
                  <Center>
                    <ActionIcon variant="gradient"
                      size={isMobile ? 50 : 68}
                      aria-label="Gradient action icon"
                      radius={100}
                      // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                      bg={tema.get().bgFiturHome}
                    >
                      <IoColorPalette size={isMobile ? 25 : 35} color={tema.get().utama} />
                    </ActionIcon>
                  </Center>
                  <Center>
                    <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Tema</Text>
                  </Center>
                </Box>
                <Box onClick={() => router.push('/banner')}>
                  <Center>
                    <ActionIcon variant="gradient"
                      size={isMobile ? 50 : 68}
                      aria-label="Gradient action icon"
                      radius={100}
                      // gradient={{ from: '#DFDA7C', to: '#F2AF46', deg: 174 }}
                      bg={tema.get().bgFiturHome}
                    >
                      <RiLayoutTop2Fill size={isMobile ? 25 : 35} color={tema.get().utama} />
                    </ActionIcon>
                  </Center>
                  <Center>
                    <Text fz={isMobile ? 13 : 15} c={tema.get().utama}>Banner</Text>
                  </Center>
                </Box>
              </>
            }
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

import { TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Anchor, Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';

function DrawerBanner({ onSuccess, }: { onSuccess: (val: boolean) => void; }) {
  const [openDrawerBanner, setOpenDrawerBanner] = useState(false);
  const tema = useHookstate(TEMA)
  const router = useRouter();
  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
          onClick={() => setOpenDrawerBanner(true)}
        >
          <Anchor underline='never' onClick={() => router.push("/banner/create")}>
            <Flex justify={"center"} align={"center"} direction={"column"}>
              <Box>
                <IoAddCircle size={30} color={tema.get().utama} />
              </Box>
              <Box>
                <Text c={tema.get().utama}>Tambah Banner</Text>
              </Box>
            </Flex>
          </Anchor>
        </SimpleGrid>
      </Stack>
    </Box>
  );
}

export default DrawerBanner;

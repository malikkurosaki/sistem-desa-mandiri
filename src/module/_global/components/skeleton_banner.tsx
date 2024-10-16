import { useHookstate } from '@hookstate/core';
import { Box, Flex, Group, Paper, Skeleton } from '@mantine/core';
import { TEMA } from '../bin/val_global';

export default function SkeletonBanner() {
  const tema = useHookstate(TEMA)
  return (
    <Box mb={10}>
      <Paper radius={'md'} withBorder style={{
        width: '100%',
        maxWidth: 550,
        height: 85,
        backgroundColor: 'transparent',
        border: `1px solid ${tema.get().bgTotalKegiatan}`

      }}>
        <Group
          mt={"25"}
          align="center"
          ml={"12"}
        >
          <Flex direction={"row"} justify={"center"} align={"center"} gap={"md"} >
            <Box pr={12}>
              <Skeleton height={40} width={90} />

            </Box>
            <Box>
              <Skeleton height={25} width={150} />
            </Box>
          </Flex>
        </Group>
      </Paper>
    </Box>
  );
}
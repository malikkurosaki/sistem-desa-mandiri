import { Box, Group, Skeleton } from "@mantine/core";

export default function LoadingPage() {
   return (
      <>
         <Box p={20}>
            <Skeleton width={"100%"} height={180} radius={"md"} />
            <Group my={20} justify="space-between" grow>
               <Skeleton height={50} radius={"md"} />
               <Skeleton height={50} radius={"md"} />
               <Skeleton height={50} radius={"md"} />
            </Group>
            <Group my={20} justify="space-between" grow>
               <Skeleton height={100} radius={"md"} />
               <Skeleton height={100} radius={"md"} />
            </Group>
            <Group my={20} justify="space-between" grow>
               <Skeleton height={100} radius={"md"} />
               <Skeleton height={100} radius={"md"} />
            </Group>
            <Group my={20} justify="space-between" grow>
               <Skeleton height={100} radius={"md"} />
               <Skeleton height={100} radius={"md"} />
            </Group>
         </Box>
      </>

   )
}
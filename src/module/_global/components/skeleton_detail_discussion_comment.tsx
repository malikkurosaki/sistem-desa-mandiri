import { ActionIcon, Box, Divider, Group, Skeleton } from "@mantine/core";

export default function SkeletonDetailDiscussionComment() {
  return (
    <>
      <Group justify='space-between'>
        <Box>
          <Box>
            <ActionIcon
              variant="light"
              bg={"#DCEED8"}
              size={50}
              radius={100}
              aria-label="icon"
            >
              <Skeleton height={25} width={25} />
            </ActionIcon>
          </Box>
          <Skeleton height={15} mt={6} width="50%" radius="xl" />
        </Box>
        <Skeleton height={15} mt={6} width="30%" radius="xl" />
      </Group>
      <Skeleton height={40} radius="xl" />
      <Box mt={20}>
        <Divider size={"xs"} />
      </Box>
    </>
  );
}

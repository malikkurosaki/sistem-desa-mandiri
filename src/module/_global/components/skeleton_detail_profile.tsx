import { ActionIcon, Box, Group, Skeleton } from '@mantine/core';
import React from 'react';

export default function SkeletonDetailProfile() {
    return (
        <Box p={20}>
            <Group justify="space-between" grow py={5}>
                <Group>
                    <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={28}
                        radius={100}
                        aria-label="icon"
                    >
                        <Skeleton height={20} width={40} />
                    </ActionIcon>
                    <Box>
                        <Skeleton height={18} width={80} />
                    </Box>
                </Group>
                <Box>
                    <Skeleton height={18} width={"100%"} />
                </Box>
            </Group>
            <Group justify="space-between" grow py={5}>
                <Group>
                    <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={28}
                        radius={100}
                        aria-label="icon"
                    >
                        <Skeleton height={20} width={40} />
                    </ActionIcon>
                    <Box>
                        <Skeleton height={18} width={80} />
                    </Box>
                </Group>
                <Box>
                    <Skeleton height={18} width={"100%"} />
                </Box>
            </Group>
            <Group justify="space-between" grow py={5}>
                <Group>
                    <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={28}
                        radius={100}
                        aria-label="icon"
                    >
                        <Skeleton height={20} width={40} />
                    </ActionIcon>
                    <Box>
                        <Skeleton height={18} width={80} />
                    </Box>
                </Group>
                <Box>
                    <Skeleton height={18} width={"100%"} />
                </Box>
            </Group>
            <Group justify="space-between" grow py={5}>
                <Group>
                    <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={28}
                        radius={100}
                        aria-label="icon"
                    >
                        <Skeleton height={20} width={40} />
                    </ActionIcon>
                    <Box>
                        <Skeleton height={18} width={80} />
                    </Box>
                </Group>
                <Box>
                    <Skeleton height={18} width={"100%"} />
                </Box>
            </Group>
        </Box>
    );
}


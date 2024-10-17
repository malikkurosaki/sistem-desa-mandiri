import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Group, Skeleton } from '@mantine/core';
import React from 'react';
import { TEMA } from '../bin/val_global';

export default function SkeletonDetailProfile() {
    const tema = useHookstate(TEMA)
    return (
        <Box p={20}>
            <Group justify="space-between" grow py={5}>
                <Group>
                    <ActionIcon
                        variant="light"
                        bg={tema.get().bgTotalKegiatan}
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
                        bg={tema.get().bgTotalKegiatan}
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
                        bg={tema.get().bgTotalKegiatan}
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
                        bg={tema.get().bgTotalKegiatan}
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


import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Group, Skeleton } from '@mantine/core';
import React from 'react';
import { TEMA } from '../bin/val_global';

export default function SkeletonSingle() {
    const tema = useHookstate(TEMA)
    return (
        <Box pt={20}>
            <Group
                align="center"
                style={{
                    border: `1px solid ${tema.get().bgTotalKegiatan}`,
                    padding: 10,
                    borderRadius: 10,
                    cursor: "pointer",
                }}
            >
                <Box>
                    <ActionIcon
                        variant="light"
                        bg={tema.get().bgTotalKegiatan}
                        size={50}
                        radius={100}
                        aria-label="icon"
                    >
                        <Skeleton height={25} width={25} />
                    </ActionIcon>
                </Box>
                <Box>
                    <Skeleton height={20} width={100} />
                </Box>
            </Group>
        </Box>
    );
}
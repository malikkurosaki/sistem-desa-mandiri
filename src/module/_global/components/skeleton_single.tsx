import { ActionIcon, Box, Group, Skeleton } from '@mantine/core';
import React from 'react';

export default function SkeletonSingle() {
    return (
        <Box pt={20}>
            <Group
                align="center"
                style={{
                    border: `1px solid ${"#DCEED8"}`,
                    padding: 10,
                    borderRadius: 10,
                    cursor: "pointer",
                }}
            >
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
                <Box>
                    <Skeleton height={20} width={100} />
                </Box>
            </Group>
        </Box>
    );
}
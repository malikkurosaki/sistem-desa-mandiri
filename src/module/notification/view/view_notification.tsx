import { LayoutIconBack, LayoutNavbarHome } from '@/module/_global'
import { Box, Grid, ScrollArea, Text } from '@mantine/core'
import React from 'react'
import NavbarNotification from '../components/ui/navbar_notification'
import ListNotification from '../components/list_notification'

export default function ViewNotification() {
    return (
        <Box>
            <NavbarNotification />
            <ScrollArea h={'87vh'}>
                <Box p={20}>
                    <ListNotification />
                </Box>
            </ScrollArea>
        </Box>
    )
}

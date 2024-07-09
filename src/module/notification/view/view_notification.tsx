import { LayoutNavbarNew } from '@/module/_global'
import { Box, } from '@mantine/core'
import React from 'react'
import ListNotification from '../components/list_notification'

export default function ViewNotification() {
    return (
        <Box>
            <LayoutNavbarNew back='/home' title='Notifikasi' menu={<></>} />
            <Box p={20}>
                <ListNotification />
            </Box>
        </Box>
    )
}

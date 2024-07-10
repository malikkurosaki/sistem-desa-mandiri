'use client'

import { ActionIcon, Box } from "@mantine/core"
import { useState } from "react"
import { MdGrid3X3, MdGridView, MdList, MdViewList } from "react-icons/md"

export function ToogleList({ isGrid, setIsGrid }: { isGrid: boolean, setIsGrid: any }) {
    function onToogleList() {
        setIsGrid(!isGrid)
    }

    return <Box>
        <ActionIcon variant="light" onClick={onToogleList}>
            {isGrid ? <MdList size={24} /> : <MdGridView size={22} />}
        </ActionIcon>
    </Box>
}
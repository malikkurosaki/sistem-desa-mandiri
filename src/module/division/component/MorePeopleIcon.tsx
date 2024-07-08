'use client'

import { WARNA } from "@/module/_global"
import { Avatar } from "@mantine/core"
import { MdAccountCircle, MdPeople } from "react-icons/md"

export function MorePeopleIcon() {
    return <Avatar.Group>
        <Avatar>
            <MdAccountCircle size={32} color={WARNA.biruTua} />
        </Avatar>
        <Avatar>
            +5
        </Avatar>
    </Avatar.Group>
}
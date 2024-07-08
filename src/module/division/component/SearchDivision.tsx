'use client'

import { TextInput } from "@mantine/core"
import { MdSearch } from "react-icons/md"

export function SearchDivision({ text, setText }: { text: string, setText: any }) {
    return <TextInput onChange={(e) => setText(e.target.value)} value={text} radius={30} leftSection={<MdSearch />} placeholder="Cari Divisi" />
}
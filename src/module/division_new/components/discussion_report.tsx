import { WARNA } from "@/module/_global";
import { Box, Group, Text } from "@mantine/core";
import { GoDiscussionClosed } from "react-icons/go";
import { CiClock2, CiUser } from "react-icons/ci";

const dataDiskusi = [
    {
        id: 1,
        judul: 'Mengatasi Limbah Makanan ',
        user: 'Fibra Marcell',
        date: '21 Juni 2024'
    },
    {
        id: 2,
        judul: 'Pentingnya Menjaga Kelestarian Hutan ',
        user: 'Bayu Tegar',
        date: '15 Juni 2024'
    },
    {
        id: 3,
        judul: 'Mengatasi Limbah Industri ',
        user: 'Nian Putri',
        date: '11 Mei 2024'
    },
    {
        id: 4,
        judul: 'Manfaat Sampah Plastik',
        user: 'Budi Prasetyo',
        date: '10 Mei 2024'
    },
]
export default function DiscussionReport() {
    return (
        <Box pt={10}>
            <Text ta={"center"} mb={20} fw={'bold'}>DISKUSI</Text>
            {dataDiskusi.map((v, i) => {
                return (
                    <Box key={i} m={10}>
                        <Box style={{
                            borderRadius: 10,
                            border: `1px solid ${"#D6D8F6"}`,
                            padding: 15
                        }} mb={10}>
                            <Group align="center">
                                <GoDiscussionClosed size={25} />
                                <Box w={{ base: 230, md: 300 }}>
                                    <Text truncate="end" fw={'bold'}>{v.judul}</Text>
                                </Box>
                            </Group>
                            <Group justify="space-between" align="center" mt={20} c={'#8C8C8C'}>
                                <Group gap={5} align="center">
                                    <CiUser size={18} />
                                    <Text fz={13}>{v.user}</Text>
                                </Group>
                                <Group gap={5} align="center">
                                    <CiClock2 size={18} />
                                    <Text fz={13}>{v.date}</Text>
                                </Group>
                            </Group>
                        </Box>
                    </Box>
                )
            })
            }
        </Box>
    )
}
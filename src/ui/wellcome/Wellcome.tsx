'use client'
import colors from "@/lib/colors";
import { Anchor, Button, Center, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { pagePath } from "@/lib/pagePath";


const listTextWellcome = [
    {
        "id": "1",
        "text": "Selamat Datang di Aplikasi Desa Darmasaba Optimalkan Proyek Desa dengan Fitur Kolaboratif Manajemen Proyek yang Efisien untuk Masa Depan Yang Lebih Baik",
        "img": "/assets/img/wellcome/wellcome-1.png"
    },
    {
        "id": "2",
        "text": "Monitor Progres Tugas Secara Real-time Kolaborasi Tim yang Dinamis untuk Sukses Bersama Perencanaan Tugas yang Terstruktur untuk Pertumbuhan Desa",
        "img": "/assets/img/wellcome/wellcome-2.png"
    },
    {
        "id": "3",
        "text": "Mulai Membangun Desa dengan Teknologi Canggih Manfaatkan Fitur Analytics untuk Keputusan yang Lebih Baik Selamat Bergabung di Komunitas Desa Darmasaba yang Progresif",
        "img": "/assets/img/wellcome/wellcome-3.png"
    }
]

export function Wellcome() {
    const [index, setIndex] = useState(0)
    const router = useRouter()

    function onLanjutkan() {
        if (index === listTextWellcome.length - 1) {
            return router.push(pagePath.dashboard())
        }
        setIndex(index + 1)
    }

    function onSebelumnya() {
        if (index === 0) {
            return
        }
        setIndex(index - 1)

    }
    return <Stack >
        <Group pos={"absolute"} top={40} right={40}>
            <Anchor>Lewati</Anchor>
        </Group>
        <Stack gap={"xl"} p={"xl"}>
            <WellcomeItem index={index} listTextWellcome={listTextWellcome} />
        </Stack>
        <Flex w={"100%"} pos={"absolute"} bottom={40} justify={"space-between"} left={0} right={0} p={"xl"}>
            <Button display={index === 0 ? "none" : "block"} onClick={onSebelumnya} radius={100} size="compact-sm" color={colors["gray-1"]}>Sebelumnya</Button>
            <Text>{index + 1}/{listTextWellcome.length}</Text>
            <Button onClick={onLanjutkan} radius={100} size="compact-sm" color={colors["blue-1"]}>Lanjutkan</Button>
        </Flex>
    </Stack>
}

function WellcomeItem({ index, listTextWellcome }: { index: number, listTextWellcome: any[] }) {
    return <Stack align="center" justify="center">
        <Center>
            <Image w={"70%"} src={listTextWellcome[index].img} alt="gambar wellcome" />
        </Center>
        <Text style={{
            textAlign: "center"
        }}>{listTextWellcome[index].text}</Text>
    </Stack>
}
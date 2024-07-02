'use client'

import colors from "@/lib/colors"
import { pagePath } from "@/lib/pagePath"
import { Anchor, Button, PinInput, Stack, Text } from "@mantine/core"
import { useRouter } from 'next/navigation'

export function Ver() {
    const router = useRouter()

    function onKirimUlang() {

    }

    function onLanjutkan() {
        router.push(pagePath.authWellcome())
    }
    
    return <Stack gap={0} p={"lg"}>
        <Text size="md" fw={"bold"}>Verifikasi Nomor Telepon</Text>
        <Text size="sm" c={colors["gray-1"]}>Masukkan kode yang kami kirimkan melalui WhatsApp </Text>
        <Stack gap={"xl"} align="center" p={"lg"}>
            <PinInput size="lg" radius={16} />
            <Button onClick={onLanjutkan} radius={100} size="lg" fullWidth color={colors["blue-1"]}>Lanjutkan</Button>
            <Text>Tidak mendapatkan kode? <Anchor onClick={onKirimUlang} >Kirim ulang</Anchor></Text>
        </Stack>

    </Stack>
}
'use client'
import colors from "@/lib/colors";
import { pagePath } from "@/lib/pagePath";
import { Button, Center, Checkbox, Flex, Grid, Image, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { useRouter } from 'next/navigation'

export function Login() {
    const router = useRouter()
    const textInfo = "Kami akan mengirim kode verifikasi melalui WhatsApp, guna mengonfirmasikan nomor Anda."

    function onMasuk() {
        router.push(pagePath.authVer())
    }
    return <Stack gap={"xl"} p={"lg"}>
        <TextInput size="lg" description={textInfo} type="number" radius={100} leftSection={<Text>+62</Text>} placeholder="Username" />
        <Checkbox label="Ingat saya" />
        <Button onClick={onMasuk} size="lg" color={colors["blue-1"]} radius={100}>MASUK</Button>
    </Stack>
}
'use client'
import { pagePath } from "@/lib/pagePath";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";

export function Splash() {
    useShallowEffect(() => {
        const to = setTimeout(() => {

        }, 3000)

        return () => clearTimeout(to)
    }, [])
    return <Stack>
        Slash
    </Stack>
}
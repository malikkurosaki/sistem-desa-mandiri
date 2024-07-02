'use client'
import colors from "@/lib/colors";
import { Grid, Image, Stack, Title } from "@mantine/core";

export function AuthLayout({ children }: { children: React.ReactNode }) {

    return <Stack p={0} m={0} gap={0} pos={"fixed"} w={"100%"} h={"100%"}>
        <Grid pos={"relative"} p={0} m={0} >
            <Grid.Col p={"xl"} miw={240} maw={560} h={"102vh"} bg={colors["light-1"]} pos={"relative"}>
                <Stack align="center" justify="center">
                    <Image w={100} src={'/assets/img/bg/bg-1.png'} alt="gambar logo" />
                    <Title order={3}>PERBEKAL DARMASABA</Title>
                </Stack>
                {children}
            </Grid.Col>
            <Grid.Col span={"auto"} visibleFrom="xs" p={0} m={0}>

            </Grid.Col>
        </Grid>
    </Stack>
}
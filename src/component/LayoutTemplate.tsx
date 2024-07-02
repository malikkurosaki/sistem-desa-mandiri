'use client'
import colors from "@/lib/colors";
import { Stack, Grid, Title, Flex, Image, ActionIcon, Text } from "@mantine/core";
import { MdAccountCircle, MdNotifications, MdSearch } from 'react-icons/md'

export function LayoutTemplate({ children }: { children: React.ReactNode }) {
    return <Stack p={0} m={0} gap={0} pos={"fixed"} w={"100%"} h={"100%"}>
        <Flex p={{
            base: 16,
            sm: 12,
            md: 12,
        }} bg={colors["blue-1"]} justify={"space-between"} align={"center"} style={{
            borderBottom: `1px solid ${colors["blue-2"]}`,
            borderRadius: "0 0 20px 20px"
        }}>
            <Image visibleFrom="xs" w={36} src={'/assets/img/bg/bg-1.png'} alt="gambar logo" />
            <Text c={colors["light-1"]} fw={"bold"}>PERBEKAL DARMASABA</Text>
            <Flex gap={"lg"}>
                <ActionIcon radius={100} bg={colors["blue-2"]} variant="filled">
                    <MdSearch size={24} color="white" />
                </ActionIcon>
                <ActionIcon radius={100} bg={colors["blue-2"]} variant="filled">
                    <MdNotifications size={24} color="white" />
                </ActionIcon>
                <ActionIcon radius={100} bg={colors["blue-2"]} variant="filled">
                    <MdAccountCircle size={24} color="white" />
                </ActionIcon>
            </Flex>
        </Flex>
        <Grid gutter={0} pos={"relative"} p={0} m={0} >
            <Grid.Col 
            style={{
                borderRight: `1px solid ${colors["blue-2"]}`,
            }}
            span={"content"} hiddenFrom="lg" visibleFrom="xs" p={0} m={0} bg={colors["light-1"]} pos={"relative"}>
                ini adalah content kirinya
            </Grid.Col>
            <Grid.Col
                style={{
                    overflow: "auto",
                }}
                span={"content"}
                maw={460}
                h={"102vh"}
                pos={"relative"}
            >
                {children}
            </Grid.Col>
            {/* <Grid.Col span={"auto"} visibleFrom="md" p={0} m={0}>
                <Stack align="center" justify="center">
                    kanan
                </Stack>
            </Grid.Col> */}
        </Grid>
    </Stack>
}
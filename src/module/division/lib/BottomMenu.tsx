import { ActionIcon, Drawer, Flex, Stack, Text } from "@mantine/core";
import { MdClose } from "react-icons/md";

export function BottomMenu({size, title, openDrawer, setOpenDrawer, children }: { size?: number | string, title?: string, openDrawer: boolean, setOpenDrawer: any, children: React.ReactNode }) {
    return <Drawer
        p={0}
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        position="bottom"
        withCloseButton={false}
        size={size || "md"}
        styles={{
            content: {
                margin: "0 auto",
                maxWidth: 550,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20
            }
        }}
    >
        <Stack gap={"md"}>
            <Flex justify="space-between">
                <Flex justify={"end"}>
                    <Text>{title || 'Menu'}</Text>
                </Flex>
                <ActionIcon onClick={() => setOpenDrawer(false)} variant="subtle">
                    <MdClose />
                </ActionIcon>
            </Flex>
            {children}
        </Stack>
    </Drawer>
}
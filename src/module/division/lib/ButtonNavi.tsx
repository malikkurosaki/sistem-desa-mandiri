import { WARNA } from "@/module/_global";
import { Button } from "@mantine/core";

export function ButtonNavi({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return <Button radius={50} color={WARNA.biruTua} onClick={onClick}>{children}</Button>
}
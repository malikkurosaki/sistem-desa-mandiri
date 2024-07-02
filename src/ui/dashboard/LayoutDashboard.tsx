import { LayoutTemplate } from "@/component/LayoutTemplate";

export function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return <LayoutTemplate>
        {children}
    </LayoutTemplate>
}
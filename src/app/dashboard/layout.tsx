import { LayoutDashboard } from "@/ui/dashboard/LayoutDashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <LayoutDashboard>
        {children}
    </LayoutDashboard>
}
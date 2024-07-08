import { DevisionLayout } from "@/module/division/ui/DivisionLayout";


export default function Layout({ children }: { children: React.ReactNode }) {
    return <DevisionLayout>
        {children}
    </DevisionLayout>
}
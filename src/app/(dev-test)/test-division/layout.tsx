import { DevisionLayout } from "@/module/division/ui/DevisionLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DevisionLayout>
        {children}
    </DevisionLayout>;
}
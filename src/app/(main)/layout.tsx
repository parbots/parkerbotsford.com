import { Header, Footer } from "@sections/main/components";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="PB" />
            <main className="w-screen h-[90vh] flex justify-center items-center">
                {children}
            </main>
            <Footer />
        </>
    );
}

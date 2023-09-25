import styles from "@styles/main/layout.module.css";

import { Header } from "@components/main/header";
import { Footer } from "@components/main/footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="Parker Botsford" />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    );
}

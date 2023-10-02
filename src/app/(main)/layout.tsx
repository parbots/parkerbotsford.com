import styles from "@styles/main/layout.module.css";

import { Header, Footer } from "@sections/main";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="PB" />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    );
}

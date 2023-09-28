import styles from "@styles/main/page-about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "about",
    description: "Learn a little bit about me.",
};

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.header}>Parker Botsford - About</h1>
        </main>
    );
}

import styles from "@styles/main/page-home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Parker Botsford",
    description: "Software developer and IT engineer.",
};

export default function HomePage() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Parker Botsford</h1>
        </section>
    );
}

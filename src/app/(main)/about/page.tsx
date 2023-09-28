import styles from "@styles/main/page-about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "about",
    description: "Learn a little bit about me.",
};

export default function AboutPage() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>about</h1>
        </section>
    );
}

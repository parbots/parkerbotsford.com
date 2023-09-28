import styles from "@styles/main/page-contact.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "contact",
    description: "Reach out and let's chat!",
};

export default function ContactPage() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>contact</h1>
        </section>
    );
}

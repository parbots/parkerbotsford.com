import styles from "@styles/main/page-contact.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "contact",
    description: "Reach out and let's chat!",
};

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.header}>Parker Botsford - Contact</h1>
        </main>
    );
}

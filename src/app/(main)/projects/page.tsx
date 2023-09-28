import styles from "@styles/main/page-projects.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "projects",
    description: "Check out the cool stuff i've built.",
};

export default function ProjectsPage() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>projects</h1>
        </section>
    );
}

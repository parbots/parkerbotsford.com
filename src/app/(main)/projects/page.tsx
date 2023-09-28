import styles from "@styles/main/page-projects.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "projects",
    description: "Check out the cool stuff i've built.",
};

export default function ProjectsPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.header}>Parker Botsford - Projects</h1>
        </main>
    );
}

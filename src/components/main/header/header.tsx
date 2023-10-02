import styles from "./header.module.css";

import { HeaderNav } from "@components/main/headerNav";

export const Header = ({ title }: { title: string }) => {
    const links = [
        {
            name: "home",
            href: "/",
        },
        {
            name: "about",
            href: "/about",
        },
        {
            name: "projects",
            href: "/projects",
        },
        {
            name: "contact",
            href: "/contact",
        },
    ];

    return (
        <header className={styles.header}>
            <section className={styles.headerLeft}>
                <h2 className={styles.title}>{title}</h2>
            </section>
            <section className={styles.headerMiddle}>
                <HeaderNav links={links} />
            </section>
            <section className={styles.headerRight}>
                <h2>S</h2>
            </section>
        </header>
    );
};

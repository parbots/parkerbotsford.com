"use client";

import Link from "next/link";
import styles from "./headerNav.module.css";
import { v4 as uuid } from "uuid";
import { usePathname } from "next/navigation";

export const HeaderNav = ({
    links,
}: {
    links: { name: string; href: string }[];
}) => {
    const currentPathname = usePathname();

    const navItems = links
        .map((link) => {
            return (
                <li key={uuid()} className={styles.navItem}>
                    <Link
                        href={link.href}
                        className={styles.link}
                        data-current={currentPathname == link.href}
                    >
                        {link.name}
                    </Link>
                </li>
            );
        })
        .reduce((listItems, linkItem, idx, linkList) => {
            listItems.push(linkItem);

            if (idx < linkList.length - 1) {
                listItems.push(
                    <li key={uuid()} className={styles.navItem}>
                        <p className={styles.linkSeperator}>/</p>
                    </li>,
                );
            }

            return listItems;
        }, [] as JSX.Element[]);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>{navItems}</ul>
        </nav>
    );
};

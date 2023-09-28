import Link from "next/link";
import styles from "./headerNav.module.css";
import { v4 as uuid } from "uuid";
import { Fragment } from "react";

export const HeaderNav = ({
    links,
}: {
    links: { name: string; href: string }[];
}) => {
    const navLinks = links.map((link, idx, arr) => {
        return (
            <Fragment key={uuid()}>
                <li className={styles.linkItem}>
                    <Link href={link.href} className={styles.link}>
                        {link.name}
                    </Link>
                </li>
                {idx < arr.length - 1 && (
                    <li className={styles.linkItem}>
                        <p className={styles.linkSeperator}>{"/"}</p>
                    </li>
                )}
            </Fragment>
        );
    });

    return (
        <nav className={styles.nav}>
            <ul className={styles.linkList}>{navLinks}</ul>
        </nav>
    );
};

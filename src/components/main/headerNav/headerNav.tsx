import Link from "next/link";
import styles from "./headerNav.module.css";

export const HeaderNav = ({
    links,
}: {
    links: { name: string; href: string }[];
}) => {
    const navLinks = links.map((link, idx, arr) => {
        return (
            <>
                <li className={styles.linkItem}>
                    <Link key={idx} href={link.href} className={styles.link}>
                        {link.name}
                    </Link>
                </li>
                {idx < arr.length - 1 && (
                    <li key={idx + arr.length} className={styles.linkItem}>
                        <p className={styles.linkSeperator}>{"/"}</p>
                    </li>
                )}
            </>
        );
    });

    return (
        <nav className={styles.nav}>
            <ul className={styles.linkList}>{navLinks}</ul>
        </nav>
    );
};

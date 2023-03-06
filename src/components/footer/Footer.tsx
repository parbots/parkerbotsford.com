
import Link from 'next/link'

import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                <Link href='/' className={styles.navLink}>/Home</Link>
                <Link href='/about' className={styles.navLink}>/About</Link>
                <Link href='/projects' className={styles.navLink}>/Projects</Link>
                <Link href='/contact' className={styles.navLink}>/Contact</Link>
            </nav>
            <p className={styles.copyright}>Copyright © 2023 Parker Botsford</p>
        </footer>
    );
};

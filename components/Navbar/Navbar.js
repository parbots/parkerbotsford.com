import styles from './Navbar.module.css';

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link href='/'>
                <a className={styles.logo}>pb</a>
            </Link>

            <ul className={styles.links}>
                <li>
                    <Link href='/'>
                        <a className={styles.link}>About Me</a>
                    </Link>
                </li>
                <li>
                    <Link href='/blog'>
                        <a className={styles.link}>Blog</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

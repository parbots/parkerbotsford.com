import styles from './Navbar.module.css';

import Link from 'next/link';

const Navbar = () => {
    return (
        <header className={styles.navbar}>
            <Link href='/'>
                <a className={styles.logo}>pb</a>
            </Link>

            <nav className={styles.linkNav}>
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
        </header>
    );
};

export default Navbar;

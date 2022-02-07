import styles from './Navbar.module.css';

import Link from 'next/link';
import ThemeToggle from 'components/ThemeToggle';

const Navbar = (props) => {
    const links = props.links.map((link) => {
        return (
            <li key={link.name}>
                <Link href={link.href}>
                    <a tabIndex='0' className={styles.link}>
                        {link.name}
                    </a>
                </Link>
            </li>
        );
    });

    return (
        <header className={styles.navbar}>
            <Link href='/'>
                <a tabIndex='0' className={styles.logo}>
                    pb
                </a>
            </Link>

            <nav className={styles.linkNav}>
                <ul className={styles.links}>
                    {links}
                    <ThemeToggle />
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;

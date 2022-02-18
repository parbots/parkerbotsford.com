import styles from './Header.module.css';

import Link from 'next/link';

import ThemeToggle from 'components/ThemeToggle';

const Header = () => {
    const links = [
        {
            name: 'Blog',
            href: '/blog',
        },
    ];

    const linkItems = links.map((link) => {
        return (
            <li key={link.name}>
                <Link href={link.href}>
                    <a className={styles.link}>{link.name}</a>
                </Link>
            </li>
        );
    });

    return (
        <header className={styles.header}>
            <Link href='/'>
                <a className={styles.logoLink}>pb</a>
            </Link>

            <nav className={styles.linkNav}>
                <ul className={styles.linkList}>{linkItems}</ul>
            </nav>

            <ThemeToggle />
        </header>
    );
};

export default Header;

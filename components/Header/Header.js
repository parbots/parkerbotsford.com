import styles from './Header.module.css';

import Link from 'next/link';

import ThemeToggle from 'components/ThemeToggle';

const Header = ({ blog }) => {
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
                {!blog && <ul className={styles.linkList}>{linkItems}</ul>}
                {blog && (
                    <Link href='/blog'>
                        <a className={styles.pathLink}>/blog</a>
                    </Link>
                )}
            </nav>

            <ThemeToggle />
        </header>
    );
};

export default Header;

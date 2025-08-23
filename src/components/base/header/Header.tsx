import styles from './Header.module.css';

import Link from './Link';

const Header = () => {
    const links = [
        { text: 'Home', href: '/' },
        { text: 'Blog', href: '/blog' },
        { text: 'Writing', href: '/writing' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h2 className={styles.title}>Parker Botsford</h2>
            </div>
            <div className={styles.center}>
                <nav className={styles.nav}>
                    {links.map((link) => (
                        <Link
                            href={link.href}
                            text={link.text}
                            key={link.href}
                        />
                    ))}
                </nav>
            </div>
            <div className={styles.right}>
                <button
                    type='button'
                    className={styles.toggle}
                >
                    toggle
                </button>
            </div>
        </header>
    );
};

export default Header;

import Link from 'next/link';

import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h2>Parker Botsford</h2>
            {/* <nav>
                <Link href='/'>
                    <a>about</a>
                </Link>
            </nav> */}
        </header>
    );
};

export default Header;

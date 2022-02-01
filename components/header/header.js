import Link from 'next/link';

import styles from './header.module.css';

const header = () => {
    return (
        <header className={styles.header}>
            <h2>Parker Botsford</h2>
            <nav>
                <Link href='/'>
                    <a>about</a>
                </Link>
            </nav>
        </header>
    );
};

export default header;

import styles from './HeroSection.module.css';

import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className={styles.heroSection}>
            <nav className={styles.header}>
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
            <div className={styles.main}>
                <h1 className={styles.title}>{"Hi, i'm Parker."}</h1>
                <p className={styles.text}>
                    {
                        "I'm a frontend web developer with a passion for creating responsive, accessible, and beautiful designs."
                    }
                </p>
            </div>
        </section>
    );
};

export default HeroSection;

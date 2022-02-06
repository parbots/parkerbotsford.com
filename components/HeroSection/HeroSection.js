import styles from './HeroSection.module.css';

import Link from 'next/link';
import Navbar from 'components/Navbar';

const HeroSection = () => {
    return (
        <section className={styles.heroSection}>
            <Navbar />
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

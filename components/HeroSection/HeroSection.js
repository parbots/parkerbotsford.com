import Header from '../Header';
import Hero from '../Hero';

import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.heroSection}>
            <Header />
            <Hero />
        </section>
    );
};

export default HeroSection;

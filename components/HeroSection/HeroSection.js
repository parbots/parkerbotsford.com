import styles from './HeroSection.module.css';

import Header from '../Header';
import Hero from '../Hero';

const HeroSection = () => {
    return (
        <section className={styles.heroSection}>
            <Header />
            <Hero />
        </section>
    );
};

export default HeroSection;

import styles from './Hero.module.css';

import Section from 'components/Section/';
import Navbar from 'components/Navbar';

const Hero = () => {
    return (
        <Section className={styles.heroSection}>
            <Navbar />
            <h1 className={styles.title}>{"Hi, i'm Parker."}</h1>
            <p className={styles.text}>
                {
                    "I'm a frontend web developer with a passion for creating responsive, accessible, and beautiful designs."
                }
            </p>
        </Section>
    );
};

export default Hero;

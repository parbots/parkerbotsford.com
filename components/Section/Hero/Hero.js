import styles from './Hero.module.css';

import Section from 'components/Section/';

import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <Section className={styles.heroSection}>
            <h1 className={styles.heroTitle}>
                <Typewriter
                    options={{ cursor: '｜' }}
                    onInit={(typeWriter) => {
                        typeWriter
                            .pauseFor(500)
                            .typeString(`Hi, i'm Parker.`)
                            .start();
                    }}
                />
            </h1>
            <p className={styles.heroText}>
                {'Frontend web developer with a passion for creating '}
                <strong>responsive</strong>, <strong>accessible</strong>
                {', and '}
                <strong>beautiful</strong> designs.
            </p>
        </Section>
    );
};

export default Hero;

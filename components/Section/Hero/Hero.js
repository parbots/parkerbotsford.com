import styles from './Hero.module.css';

import Section from 'components/Section/';
import Navbar from 'components/Navbar';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <Section id='heroSection' className={styles.heroSection}>
            <Navbar />
            <h1 className={styles.title}>
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
            <p className={styles.text}>
                {
                    "I'm a frontend web developer with a passion for creating responsive, accessible, and beautiful designs."
                }
            </p>
        </Section>
    );
};

export default Hero;

import styles from './Hero.module.css';

import Section from 'components/Section/';

import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <Section>
            <div className={styles.heroContainer}>
                <div className={styles.heroTitleContainer}>
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
                </div>
                <p className={styles.heroText}>
                    {'Web developer with a passion for building '}
                    <strong>fast</strong>, <strong>responsive</strong>
                    {', and '}
                    <strong>beautiful</strong> websites.
                </p>
                <div className={styles.heroHintContainer}>
                    <p className={styles.heroHint}>
                        Hint: This color highlights interactive things!
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default Hero;

import styles from './Hero.module.css';

import Section from 'components/Section/';
import Navbar from 'components/Navbar';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <Section id='heroSection' className={styles.heroSection}>
            <Navbar
                links={[
                    {
                        name: 'About',
                        href: '/',
                    },
                    {
                        name: 'Blog',
                        href: '/blog',
                    },
                ]}
            />

            <div className={styles.hero}>
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
                    {'Frontend web developer with a passion for creating '}
                    <strong>responsive</strong>, <strong>accessible</strong>
                    {', and '}
                    <strong>beautiful</strong> designs.
                </p>
            </div>
        </Section>
    );
};

export default Hero;

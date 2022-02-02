import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.about}>
                <h2>About Me</h2>
                <p>
                    I love building amazing websites that are both fast and
                    responsive.
                </p>
            </div>
            <div className={styles.skills}>
                <h2>Skills</h2>
                <ul>
                    <li>React</li>
                    <li>Next.js</li>
                    <li>Git</li>
                </ul>
            </div>
            <div className={styles.info}>
                <h2>Hover any skill</h2>
            </div>
        </section>
    );
};

export default AboutSection;

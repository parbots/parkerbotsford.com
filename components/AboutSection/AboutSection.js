import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.left}>
                <h2>About Me</h2>
                <p>
                    I love building amazing websites that are both fast and
                    responsive.
                </p>
            </div>
        </section>
    );
};

export default AboutSection;

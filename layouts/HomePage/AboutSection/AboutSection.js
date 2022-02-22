import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.headerTitle}>About Me</h2>
            </div>
            <div className={styles.content}></div>
        </section>
    );
};

export default AboutSection;

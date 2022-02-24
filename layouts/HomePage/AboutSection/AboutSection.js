import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.headerTitle}>About Me</h2>
            </header>
            <section className={styles.content}></section>
        </section>
    );
};

export default AboutSection;

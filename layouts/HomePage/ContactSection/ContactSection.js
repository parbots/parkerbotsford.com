import styles from './ContactSection.module.css';

const ContactSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Contact Me</h1>
            </div>
            <div className={styles.content}></div>
        </section>
    );
};

export default ContactSection;

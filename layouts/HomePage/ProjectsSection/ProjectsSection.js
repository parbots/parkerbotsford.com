import styles from './ProjectsSection.module.css';

const ProjectsSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.headerTitle}>Projects</h2>
            </div>
            <div className={styles.content}></div>
        </section>
    );
};

export default ProjectsSection;

import styles from './ProjectsSection.module.css';

const ProjectsSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.headerTitle}>Projects</h2>
            </div>
            <div className={styles.content}>
                <section className={styles.project}>
                    <div className={styles.projectImage}>PlaceHolder</div>
                    <div className={styles.projectInfo}>
                        <h3 className={styles.projectTitle}>Project Name</h3>
                        <p>Description</p>
                        <div className={styles.tagContainer}>
                            <p className={styles.tagName}>Languages</p>
                            <ul className={styles.tagList}>
                                <li className={styles.tag}>Javascript</li>
                                <li className={styles.tag}>Html</li>
                            </ul>
                        </div>
                        <div className={styles.tagContainer}>
                            <p className={styles.tagName}>Tools</p>
                            <ul className={styles.tagList}>
                                <li className={styles.tag}>Next.js</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default ProjectsSection;

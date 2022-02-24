import styles from './ProjectCard.module.css';

const ProjectCard = ({ name, link, githubLink, description, madeWith }) => {
    const toolItems = madeWith.map((tool) => {
        return (
            <li key={tool.name} className={styles.toolItem}>
                {tool.link && (
                    <a
                        href={tool.link}
                        target='_blank'
                        rel='noreferrer'
                        className={styles.tool + ' ' + styles.toolLink}
                    >
                        {tool.name}
                    </a>
                )}
                {!tool.link && <p className={styles.tool}>{tool.name}</p>}
            </li>
        );
    });

    return (
        <section className={styles.card}>
            <div className={styles.temp}>
                <h3>Image</h3>
            </div>
            <div className={styles.projectInfo}>
                <header className={styles.header}>
                    <h3 className={styles.title}>
                        <a
                            href={link}
                            target='_blank'
                            rel='noreferrer'
                            className={styles.titleLink}
                        >
                            {name}
                        </a>
                    </h3>
                    <span className={styles.brace}>{'{'}</span>
                </header>

                <section className={styles.githubSection}>
                    <a
                        href={githubLink}
                        target='_blank'
                        rel='noreferrer'
                        className={styles.githubLink}
                    >
                        View On Github
                    </a>
                </section>

                <section className={styles.section}>
                    <p className={styles.sectionTitle}>description: </p>
                    <p className={styles.description}>{description}</p>
                </section>

                <section className={styles.section}>
                    <p className={styles.sectionTitle}>madeWith:</p>
                    <ul className={styles.toolsList}>{toolItems}</ul>
                </section>

                <footer className={styles.footer}>
                    <span className={styles.brace}>{'}'}</span>
                </footer>
            </div>
        </section>
    );
};

export default ProjectCard;

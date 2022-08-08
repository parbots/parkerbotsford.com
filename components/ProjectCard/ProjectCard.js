import Image from 'next/image';
import styles from './ProjectCard.module.css';

const ProjectCard = ({
    image,
    name,
    link,
    githubLink,
    description,
    languages,
    tools,
}) => {
    const languageItems = languages.map((language) => {
        return (
            <li key={language.name} className={styles.toolItem}>
                {language.link && (
                    <a
                        href={language}
                        target='_blank'
                        rel='noreferrer'
                        className={styles.tool + ' ' + styles.toolLink}
                    >
                        {language.name}
                    </a>
                )}
                {!language.link && (
                    <p className={styles.tool}>{language.name}</p>
                )}
            </li>
        );
    });

    const toolItems = tools.map((tool) => {
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
            <div className={styles.imageContainer}>
                <Image
                    src={image}
                    quality='100'
                    alt={name}
                    className={styles.image}
                />
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
                    <p className={styles.sectionTitle}>Description: </p>
                    <p className={styles.description}>{description}</p>
                </section>

                <section className={styles.section}>
                    <p className={styles.sectionTitle}>Coded With:</p>
                    <ul className={styles.toolsList}>{languageItems}</ul>
                </section>

                <section className={styles.section}>
                    <p className={styles.sectionTitle}>Tools Used:</p>
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

import styles from './AboutSection.module.css';

const AboutSection = () => {
    const skills = [
        { name: 'Html' },
        { name: 'CSS' },
        { name: 'Javascript' },
        { name: 'Typescript', link: 'https://www.typescriptlang.org/' },
        { name: 'React', link: 'https://reactjs.org/' },
        { name: 'Next.js', link: 'https://nextjs.org/' },
        { name: 'Node.js', link: 'https://nodejs.org/' },
        { name: 'Git' },
        { name: 'Github', link: 'https://github.com/about' },
    ];

    const skillItems = skills.map((skill) => {
        return (
            <li key={skill.name} className={styles.skillItem}>
                {skill.link && (
                    <a
                        href={skill.link}
                        target='_blank'
                        rel='noreferrer'
                        className={styles.skill + ' ' + styles.skillLink}
                    >
                        {skill.name}
                    </a>
                )}
                {!skill.link && <p className={styles.skill}>{skill.name}</p>}
            </li>
        );
    });

    return (
        <section className={styles.section}>
            <section className={styles.sectionLeft}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>About Me</h2>
                </header>
                <section className={styles.contentLeft}>
                    <div>
                        <p>
                            I love coding and creating tools for other
                            developers.
                        </p>
                        <p>
                            (Check them out on my{' '}
                            <a
                                href='https://www.github.com/parbots'
                                target='_blank'
                                rel='noreferrer'
                                className={styles.aboutLink}
                            >
                                Github
                            </a>
                            !)
                        </p>
                    </div>
                    <div>
                        <p>
                            {
                                "I'm currently using Typescript, React, and Next.js."
                            }
                        </p>
                    </div>
                    <div>
                        <p>Some fun facts about me:</p>
                        <ul className={styles.factList}>
                            <li>
                                {'I am obssessed with the '}
                                <a
                                    href='https://www.github.com/morhetz/gruvbox'
                                    target='_blank'
                                    rel='noreferrer'
                                    className={styles.aboutLink}
                                >
                                    Gruvbox
                                </a>
                                {' colorscheme.'}
                            </li>
                            <li>I love skateboarding!</li>
                            <li>I drink 2 cups of coffee a day.</li>
                        </ul>
                    </div>
                </section>
            </section>

            <section className={styles.sectionRight}>
                <header className={styles.header}>
                    <h2 className={styles.headerTitle}>Skills</h2>
                </header>
                <section className={styles.contentRight}>
                    <ul className={styles.skillList}>{skillItems}</ul>
                </section>
            </section>
        </section>
    );
};

export default AboutSection;

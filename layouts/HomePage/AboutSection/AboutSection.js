import styles from './AboutSection.module.css';

// TODO: use flex column on mobile

const AboutSection = () => {
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
                                {"I'm obssessed with the "}
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
                    <h2 className={styles.headerTitle}>My Skills</h2>
                </header>
                <section className={styles.contentRight}></section>
            </section>
        </section>
    );
};

export default AboutSection;

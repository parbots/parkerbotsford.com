import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.headerTitle}>About Me</h2>
            </header>
            <section className={styles.content}>
                <p>I love coding and creating tools for other developers.</p>

                <p>(Check them out on my Github!)</p>

                <p>{"I'm currently using Typescript, React, and Next.js."}</p>

                <p>Some fun facts about me:</p>

                <ul className={styles.factList}>
                    <li>{"I'm obssessed with the Gruvbox colorscheme."}</li>
                    <li>I love skateboarding!</li>
                    <li>I drink 2 cups of coffee a day.</li>
                </ul>
            </section>
        </section>
    );
};

export default AboutSection;

import styles from './IntroSection.module.css';

const IntroSection = () => {
    return (
        <section className={styles.section}>
            <header className={styles.titleContainer}>
                <h1 className={styles.title}>{`Hi, i'm Parker.`}</h1>
            </header>
            <section className={styles.descriptionContainer}>
                <p className={styles.description}>
                    {`Fullstack developer with a passion for building `}
                    <strong>fast</strong>
                    {`, `}
                    <strong>responsive</strong>
                    {`, and `}
                    <strong>beautiful</strong>
                    {` technologies for the web.`}
                </p>
                <p
                    className={styles.hint}
                >{`Hint: This color highlights links and interactive things!`}</p>
            </section>
        </section>
    );
};

export default IntroSection;

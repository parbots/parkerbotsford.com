import styles from './IntroSection.module.css';

const IntroSection = () => {
    return (
        <section className={styles.introSection}>
            <section className={styles.introTitleSection}>
                <h1 className={styles.introTitle}>{`Hi, i'm Parker.`}</h1>
            </section>
            <section className={styles.introDescriptionSection}>
                <p className={styles.introDescription}>
                    {`Web developer with a passion for building `}
                    <strong>fast</strong>
                    {`, `}
                    <strong>responsive</strong>
                    {`, and `}
                    <strong>beautiful</strong>
                    {` websites.`}
                </p>
                <p
                    className={styles.introHint}
                >{`Hint: This color highlights interactive things!`}</p>
            </section>
        </section>
    );
};

export default IntroSection;

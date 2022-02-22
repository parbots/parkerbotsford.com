import styles from './IntroSection.module.css';

const IntroSection = () => {
    return (
        <section className={styles.introSection}>
            <div className={styles.introTitleContainer}>
                <h1 className={styles.introTitle}>{`Hi, i'm Parker.`}</h1>
            </div>
            <div className={styles.introDescriptionContainer}>
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
            </div>
        </section>
    );
};

export default IntroSection;

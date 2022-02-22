import styles from './IntroSection.module.css';

const IntroSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{`Hi, i'm Parker.`}</h1>
            </div>
            <div className={styles.descriptionContainer}>
                <p className={styles.description}>
                    {`Web developer with a passion for building `}
                    <strong>fast</strong>
                    {`, `}
                    <strong>responsive</strong>
                    {`, and `}
                    <strong>beautiful</strong>
                    {` websites.`}
                </p>
                <p
                    className={styles.hint}
                >{`Hint: This color highlights interactive things!`}</p>
            </div>
        </section>
    );
};

export default IntroSection;

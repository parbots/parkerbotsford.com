import InfoBox from '../InfoBox/InfoBox';

import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.aboutSection}>
            <InfoBox title='About Me'>
                <p>
                    I love building amazing websites that are both fast and
                    responsive.
                </p>
            </InfoBox>
            <InfoBox title='Skills'></InfoBox>
        </section>
    );
};

export default AboutSection;

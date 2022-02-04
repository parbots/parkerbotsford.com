import styles from './AboutSection.module.css';

import InfoBox from 'components/InfoBox';
import SkillList from 'components/SkillList';

const AboutSection = () => {
    return (
        <section className={styles.aboutSection}>
            <InfoBox title='About Me'>
                <p>
                    I love building amazing websites that are both fast and
                    responsive.
                </p>
            </InfoBox>
            <InfoBox title='Skills' hint='Select any skill'>
                <SkillList />
            </InfoBox>
        </section>
    );
};

export default AboutSection;

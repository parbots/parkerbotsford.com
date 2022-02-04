import styles from './AboutSection.module.css';

import InfoBox from 'components/InfoBox';
import SkillList from 'components/SkillList';

const AboutSection = () => {
    return (
        <section className={styles.aboutSection}>
            <InfoBox title='About Me'>
                <p>
                    I am a coding addict that loves solving problems through
                    programming.
                </p>
            </InfoBox>
            <InfoBox title='Skills'>
                <SkillList />
            </InfoBox>
        </section>
    );
};

export default AboutSection;

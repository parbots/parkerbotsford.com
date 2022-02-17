import styles from './About.module.css';

import Section from '/components/Section';
import InfoBox from 'components/InfoBox';
import SkillList from 'components/SkillList';

const About = () => {
    return (
        <Section>
            <InfoBox title='About Me'>
                <div className={styles.aboutMeBox}>
                    <p>
                        I am a coding addict that loves solving problems through
                        programming.
                    </p>
                </div>
            </InfoBox>
            <InfoBox title='Skills'>
                <div className={styles.skillBox}>
                    <SkillList />
                </div>
            </InfoBox>
        </Section>
    );
};

export default About;

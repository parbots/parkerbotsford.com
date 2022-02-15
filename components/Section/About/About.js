import styles from './About.module.css';

import Section from '/components/Section';
import InfoBox from 'components/InfoBox';
import SkillList from 'components/SkillList';

const About = () => {
    return (
        <Section id='aboutSection'>
            <InfoBox title='About Me'>
                <p>
                    I am a coding addict that loves solving problems through
                    programming.
                </p>
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

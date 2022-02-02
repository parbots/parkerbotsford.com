import { useState } from 'react';

import styles from './AboutSection.module.css';

import InfoBox from './InfoBox/InfoBox';
import SkillsBox from './SkillsBox/SkillsBox';

const AboutSection = () => {
    const defaultInfo = { title: 'Info', text: '' };
    const [info, setInfo] = useState(defaultInfo);

    return (
        <section className={styles.aboutSection}>
            <div className={styles.about}>
                <h2>About Me</h2>
                <p>
                    I love building amazing websites that are both fast and
                    responsive.
                </p>
            </div>
            <SkillsBox setInfo={setInfo} />
            <InfoBox title={info.title} text={info.text} />
        </section>
    );
};

export default AboutSection;

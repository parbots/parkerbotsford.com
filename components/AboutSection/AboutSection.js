import { useState } from 'react';

import styles from './AboutSection.module.css';

import SkillsBox from './SkillsBox/SkillsBox';

const AboutSection = () => {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.about}>
                <h2>About Me</h2>
                <p>
                    I love building amazing websites that are both fast and
                    responsive.
                </p>
            </div>
            <SkillsBox />
        </section>
    );
};

export default AboutSection;

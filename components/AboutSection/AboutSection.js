import { useState } from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
    const defaultInfo = { title: 'Hover any skill', text: '' };
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
            <div className={styles.skills}>
                <h2>Skills</h2>
                <ul className={styles.skillsList}>
                    <li
                        onMouseEnter={() =>
                            setInfo({
                                title: 'React',
                                text: 'React Framework',
                            })
                        }
                        onMouseLeave={() => setInfo(defaultInfo)}
                    >
                        React
                    </li>
                </ul>
            </div>
            <div className={styles.info}>
                <h2>{info.title}</h2>
                <p>{info.text}</p>
            </div>
        </section>
    );
};

export default AboutSection;

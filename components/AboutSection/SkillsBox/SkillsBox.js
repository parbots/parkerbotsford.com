import styles from './SkillsBox.module.css';
import SkillsList from './SkillsList/SkillsList';

const SkillsBox = () => {
    return (
        <div className={styles.skillsBox}>
            <div className={styles.top}>
                <h2 className={styles.title}>Skills</h2>
            </div>
            <SkillsList />
        </div>
    );
};

export default SkillsBox;

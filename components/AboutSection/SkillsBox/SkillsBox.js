import styles from './SkillsBox.module.css';
import SkillsList from './SkillsList/SkillsList';

const SkillsBox = (props) => {
    return (
        <div className={styles.skillsBox}>
            <div className={styles.top}>
                <h2 className={styles.title}>Skills</h2>
                <p className={styles.hint}>(click any skill)</p>
            </div>
            <SkillsList setInfo={props.setInfo} />
        </div>
    );
};

export default SkillsBox;

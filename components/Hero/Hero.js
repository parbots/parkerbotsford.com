import Header from 'components/Header';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <Header />
            <h1 className={styles.title}>{"Hi, i'm Parker."}</h1>
            <p className={styles.text}>
                {
                    "I'm a frontend web developer with a passion for creating responsive, accessible, and beautiful designs."
                }
            </p>
        </div>
    );
};

export default Hero;

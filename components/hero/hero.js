import styles from './Hero.module.css';

const Hero = () => {
    return (
        <div className={styles.hero}>
            <h1>{"Hi, i'm Parker."}</h1>
            <h2>
                {
                    "I'm a fullstack web developer with a passion for responsive, accessible, and beautiful designs."
                }
            </h2>
        </div>
    );
};

export default Hero;

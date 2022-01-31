import React from 'react';

import styles from './hero.module.css';

const hero = () => {
    return (
        <section className={styles.hero}>
            <h1>
                {
                    "I'm a fullstack web developer with a passion for responsive, accessible, and beautiful designs."
                }
            </h1>
        </section>
    );
};

export default hero;

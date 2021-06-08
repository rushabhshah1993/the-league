import React from 'react';
import styles from './home.scss';

import DivisionsContainer from '../../components/DivisionsContainer/DivisionsContainer';
import NextFights from './../../components/NextFights/NextFights';

const home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeContent}>
                <DivisionsContainer />
                <div className={styles.section}>
                    <div>News</div>
                    <NextFights />
                </div>
            </div>
        </div>
    )
}

export default home;

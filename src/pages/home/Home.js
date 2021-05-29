import React from 'react';
import styles from './home.scss';

import DivisionsContainer from '../../components/DivisionsContainer/DivisionsContainer';

const home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeContent}>
                <DivisionsContainer />
            </div>
        </div>
    )
}

export default home;

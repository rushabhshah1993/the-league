import React from 'react';

import styles from './Backdrop.css';

const Backdrop = props => {
    let classes = [styles.backdrop, styles.hide];
    if (props.show) classes.push(styles.show);

    return <div className={classes.join(' ')} onClick={props.dismiss} />;
};

export default Backdrop;
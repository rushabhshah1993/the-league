import React from 'react';
import { connect } from 'react-redux';
import DivisionCard from '../DivisionCard/DivisionCard';

import styles from './DivisionsContainer.scss';

const DivisionsContainer = props => {
    const divisionsElement = Object.keys(props.divisions).map(division => {
        return <DivisionCard division={props.divisions[division]} key={division} />
    })

    return (
        <div className={styles.divisionsContainer}>
            {divisionsElement}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        divisions: state.divisions
    }
}

export default connect(mapStateToProps)(DivisionsContainer);

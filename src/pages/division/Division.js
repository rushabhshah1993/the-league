import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DivisionRound from '../../components/DivisionRound/DivisionRound';
import DivisionTableRanking from '../../components/DivisionTableRanking/DivisionTableRanking';

import styles from './Division.scss';

const division = props => {
    let divisionId = props.match.params.divisionId;
    
    return (
        <div className={styles.divisionContainer}>
            <p className={styles.title}>Division {divisionId}</p>
            <div className={styles.divisionContent}>
                <div className={styles.divisionTableWrapper}>
                    <DivisionTableRanking divisionId={`division${divisionId}`} />
                </div>
                <div className={styles.divisionRoundWrapper}>
                    <DivisionRound divisionId={`division${divisionId}`} />
                </div>
            </div> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        divisions: state.divisions
    }
}


export default connect(mapStateToProps)(division);

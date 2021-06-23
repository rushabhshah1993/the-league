import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DivisionRound from '../../components/DivisionRound/DivisionRound';
import DivisionTableRanking from '../../components/DivisionTableRanking/DivisionTableRanking';

import styles from './Division.scss';

import {
    setFinalRankings
} from './../../actions/divisionsActions';
import {
    sortDivisionByPoints, fetchFinalRankTable
} from './../../components/DivisionTableRanking/utility';

const division = props => {
    let divisionId = props.match.params.divisionId;
    let divisionData = props.divisions[`division${divisionId}`];
    let finalTableRanks;

    if(divisionData && Object.keys(props.fighters).length) {
        if(
            divisionData.currentRound === "complete" && 
            divisionData.finalTable === undefined
        ) {
            let finalRankings = sortDivisionByPoints(divisionData.points, props.fighters);
            finalTableRanks = fetchFinalRankTable(props.fighters, finalRankings, divisionData.points);
            props.setFinalRankings(`division${divisionId}`, finalRankings, finalTableRanks);
        }
    }
    
    return (
        <div className={styles.divisionContainer}>
            <p className={styles.title}>Division {divisionId}</p>
            <div className={styles.divisionContent}>
                <div className={styles.divisionTableWrapper}>
                    <DivisionTableRanking divisionId={`division${divisionId}`} finalTable={finalTableRanks} />
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
        divisions: state.divisions,
        fighters: state.fighters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFinalRankings: (divisionId, list, rankData) => dispatch(setFinalRankings(divisionId, list, rankData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(division);

import React from 'react';
import { connect } from 'react-redux';

import styles from './nextfights.scss';

const NextFights = props => {
    console.log(props);
    let divisions = Object.keys(props.rounds).map(division => {
        let divisionData = props.rounds[division];
        let nextFightForRound = Object.keys(divisionData)
        .filter(round => divisionData[round].current)
        .reduce((obj, key) => {
            let fights = divisionData[key].fights;
            return fights.find(fight => !fight.winner);
        }, {});
        
        let fighter1 = props.fighters[nextFightForRound.fighter1];
        let fighter2 = props.fighters[nextFightForRound.fighter2];

        return (
            <div className={styles.divisionContainer} key={division}>
                <p className={styles.divisionTitle}>Division {division.split("division")[1]}</p>
                <div className={styles.fight}>
                    <div className={styles.fighter1Container}>
                        <img 
                            src={props.fighterImgs[`${fighter1?.firstName} ${fighter1?.lastName}`]}
                            className={styles.fighterImg} />
                    </div>
                    <p>vs</p>
                    <div className={styles.fighter2Container}>
                        <img 
                            src={props.fighterImgs[`${fighter2?.firstName} ${fighter2?.lastName}`]}
                            className={styles.fighterImg} />
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.nextFightsContainer}>
            <p className={styles.title}>Next Fights</p>
            { divisions }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        rounds: state.rounds,
        fighters: state.fighters,
        fighterImgs: state.fighterImgs
    }
}

export default connect(mapStateToProps)(NextFights);

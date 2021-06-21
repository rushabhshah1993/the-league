import React from 'react';
import { connect } from 'react-redux';

import styles from './nextfights.scss';

import { isEmpty } from 'lodash';

const getLastFiveFights = (fighter, fighters) => {
    let fighterFinishedFights = Object.keys(fighter.rounds)
        .filter(round => fighter.rounds[round].result !== false)
        .reduce((result, key) => {
            fighter.rounds[key].round = key;
            result.push(fighter.rounds[key]);
            return result;
          }, []);
    fighterFinishedFights.sort((a, b) => {
        return +a.round.split("round")[1] - +b.round.split("round")[1];
    })
    let lastFiveFightsArr = fighterFinishedFights.slice(-5);

    let lastFiveFightsDot = lastFiveFightsArr.map(fight => {
        return (
            <div 
                key={fight.round}
                title={`Round ${fight.round.slice(-1)}: ${fight.result} against ${fighters[fight.fighter].firstName}`}
                className={fight.result === "win" ? styles.winDot : styles.lostDot}></div>
        )
    });

    return lastFiveFightsDot;
}


const NextFights = props => {
    let divisions = Object.keys(props.rounds).map(division => {
        let divisionData = props.rounds[division];
        console.log("Division Data:   ", divisionData);
        let nextFightForRound = Object.keys(divisionData)
        .filter(round => divisionData[round].current)
        .reduce((obj, key) => {
            let fights = divisionData[key].fights;
            return fights.find(fight => !fight.winner);
        }, {});
        if(isEmpty(nextFightForRound)) {
            return null;
        }
        
        let fighter1 = props.fighters[nextFightForRound.fighter1];
        let fighter2 = props.fighters[nextFightForRound.fighter2];
        let fighter1LastFights = fighter1 && getLastFiveFights(fighter1, props.fighters);
        let fighter2LastFights = fighter2 && getLastFiveFights(fighter2, props.fighters);
        

        return (
            <div className={styles.divisionContainer} key={division}>
                <p className={styles.divisionTitle}>Division {division.split("division")[1]}</p>
                <div className={styles.fight}>
                    <div className={styles.fighterContainer}>
                        <img 
                            src={props.fighterImgs[`${fighter1?.firstName} ${fighter1?.lastName}`]}
                            className={styles.fighterImg} />
                        <div>
                            <span>{fighter1?.firstName} {fighter1?.lastName}</span>
                            <div className={styles.lastFights}>{fighter1LastFights}</div>
                        </div>
                    </div>
                    <p>vs</p>
                    <div className={styles.fighterContainer}>
                        <div>
                            <span>{fighter2?.firstName} {fighter2?.lastName}</span>
                            <div className={styles.lastFights}>{fighter2LastFights}</div>
                        </div>
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
            {
                Object.keys(props.rounds).length > 0 &&
                <p className={styles.title}>Next Fights</p>
            }
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

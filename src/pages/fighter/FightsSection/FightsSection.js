import React from 'react';
import { connect } from 'react-redux';

import styles from './FightsSection.scss';

const FightsSection = props => {
    let nextFight, nextFightElement, allFightsElement, lastFiveFightsElement;
    if(props.fights) {
        let fights = Object.keys(props.fights).sort((a, b) => {
            return +a.split("round")[1] - +b.split("round")[1];
        }).reduce((result, key) => {
            result[key] = props.fights[key];
            return result;
          }, {})

        let nextFightId = Object.keys(fights).find(key => {
            return fights[key].result === false;
        })

        nextFight = fights[nextFightId];

        let fighter = props.fighters[props.fighterId];
        let nextFighter = props.fighters[nextFight.fighter];

        let nextFighterFinishedFights = Object.keys(nextFighter.rounds)
        .filter(round => nextFighter.rounds[round].result !== false)
        .reduce((result, key) => {
            nextFighter.rounds[key].round = key;
            result.push(nextFighter.rounds[key]);
            return result;
          }, []);
        nextFighterFinishedFights.sort((a, b) => {
            return +a.round.split("round")[1] - +b.round.split("round")[1];
        })
        let lastFiveFightsArr = nextFighterFinishedFights.slice(-5);

        let lastFiveFightsDot = lastFiveFightsArr.map(fight => {
            return (
                <div 
                    key={fight.round}
                    title={`Round ${fight.round.slice(-1)}: ${fight.result} against ${props.fighters[fight.fighter].firstName}`}
                    className={fight.result === "win" ? styles.winDot : styles.lostDot}></div>
            )
        })

        lastFiveFightsElement = (
            <div className={styles.nextFighterLastFive}>
                <p>{nextFighter.firstName}'s performance:</p>
                <div className={styles.lastFiveContainer}>{lastFiveFightsDot}</div>
            </div>
        )


        nextFightElement = (
            <div className={styles.fighterRow}>
                <div className={styles.fighterSection}>
                    <img 
                        // src={`./../../../assets/images/${fighter.firstName} ${fighter.lastName}.png`}
                        src={props.fighterImgs[`${fighter.firstName} ${fighter.lastName}`]}
                        className={styles.fighterImg} />
                    <span className={styles.fighterName}>{fighter.firstName} {fighter.lastName}</span>
                </div>
                <div className={styles.vsText}>vs</div>
                <div className={styles.fighterSection}>
                    <img 
                        // src={`./../../../assets/images/${nextFighter.firstName} ${nextFighter.lastName}.png`}
                        src={props.fighterImgs[`${nextFighter.firstName} ${nextFighter.lastName}`]}
                        className={styles.fighterImg} />
                    <span className={styles.fighterName}>{nextFighter.firstName} {nextFighter.lastName}</span>
                </div>
            </div>
        )

        allFightsElement = Object.keys(fights).map(key => {
            let fight = fights[key];
            let opponent = props.fighters[fight.fighter];
            let resultText;

            if(fight.result === 'win') resultText = <span className={styles.win}>Won against {opponent.firstName}</span>;
            else if(fight.result === 'lost') resultText = <span className={styles.lost}>Lost to {opponent.firstName}</span>;
            else resultText = <span>Yet to fight</span>;

            return (
                <div className={styles.allFightsRow} key={key}>
                    <div className={styles.fighterRow}>
                        <div className={styles.fighterSection}>
                            <img 
                                // src={`./../../../assets/images/${fighter.firstName} ${fighter.lastName}.png`}
                                src={props.fighterImgs[`${fighter.firstName} ${fighter.lastName}`]}
                                className={styles.fighterImg} />
                            <span className={styles.fighterName}>{fighter.firstName} {fighter.lastName}</span>
                        </div>
                        <div className={styles.vsText}>vs</div>
                        <div className={styles.fighterSection}>
                            <span className={styles.fighterName}>{opponent.firstName}</span>
                            <img 
                                // src={`./../../../assets/images/${opponent.firstName} ${opponent.lastName}.png`}
                                src={props.fighterImgs[`${opponent.firstName} ${opponent.lastName}`]}
                                className={styles.fighterImg} />
                        </div>
                    </div>
                    <div className={styles.roundName}>Round {key.split('round')[1]}</div>
                    <div className={styles.result}>{resultText}</div>
                </div>
            )
        })
    }
    
    return (
        <div>
            <div className={styles.nextFightSection}>
                <p>Next Fight</p>
                { nextFightElement }
                { lastFiveFightsElement }
            </div>
            <div className={styles.allFightsSection}>
                <p>All Fights</p>
                { allFightsElement }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fighters: state.fighters,
        fighterImgs: state.fighterImgs
    }
}

export default connect(mapStateToProps)(FightsSection);

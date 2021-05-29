import React from 'react';
import { connect } from 'react-redux';

import styles from './FightsSection.scss';

const FightsSection = props => {
    console.log(props);
    let nextFight, nextFightElement, allFightsElement;
    if(props.fights) {
        let fights = Object.keys(props.fights).sort((a, b) => {
            console.log(a);
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

        nextFightElement = (
            <div className={styles.fighterRow}>
                <div className={styles.fighterSection}>
                    <img 
                        src={`./../../../assets/images/${fighter.firstName} ${fighter.lastName}.png`}
                        className={styles.fighterImg} />
                    <span className={styles.fighterName}>{fighter.firstName} {fighter.lastName}</span>
                </div>
                <div className={styles.vsText}>vs</div>
                <div className={styles.fighterSection}>
                    <img 
                        src={`./../../../assets/images/${nextFighter.firstName} ${nextFighter.lastName}.png`}
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
                                src={`./../../../assets/images/${fighter.firstName} ${fighter.lastName}.png`}
                                className={styles.fighterImg} />
                            <span className={styles.fighterName}>{fighter.firstName} {fighter.lastName}</span>
                        </div>
                        <div className={styles.vsText}>vs</div>
                        <div className={styles.fighterSection}>
                            <span className={styles.fighterName}>{opponent.firstName}</span>
                            <img 
                                src={`./../../../assets/images/${opponent.firstName} ${opponent.lastName}.png`}
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
        fighters: state.fighters
    }
}

export default connect(mapStateToProps)(FightsSection);

import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './round.scss';

const round = props => {
    const history = useHistory();
    const currentDivision = props.location.state.division;
    let fighters = Object.keys(props.fighters).filter(fighter => {
        return props.fighters[fighter].division === +currentDivision.slice(-1);
    }).reduce((obj, key) => {
        obj[key] = props.fighters[key];
        return obj;
    }, {});

    let fightersColumn = Object.keys(fighters).map(key => {
        let fighter = fighters[key];
        return (
            <div className={styles.mainFighterInfo} key={fighter.id}>
                <img 
                    className={styles.fighterImg}
                    src={`./../../assets/images/${fighter.firstName} ${fighter.lastName}.png`} />
                <span>{fighter.firstName} {fighter.lastName}</span>
            </div>
        )
    })

    let roundNames = [];

    let roundColumn = Object.keys(fighters).map(key => {
        let fighter = fighters[key];
        let rounds = fighter.rounds;

        rounds = Object.keys(rounds).sort((a, b) => {
            return +a.split("round")[1] - +b.split("round")[1];
        }).reduce((result, key) => {
            result[key] = rounds[key];
            return result;
          }, {})
        
        let elements = Object.keys(rounds).map(key => {
            let round = rounds[key];
            let fighter = props.fighters[round.fighter];

            let fighterFullName = `${fighter.firstName} ${fighter.lastName}`;                

            let imgClassnames = [styles.fighterImg];
            let title;
            if(round.result === 'win') {
                title = `Won against ${fighterFullName}`;
                imgClassnames.push(styles.won);
            } else if(round.result === 'lost') {
                title = `Lost to ${fighterFullName}`;
                imgClassnames.push(styles.lost);
            } else {
                title = `Yet to fight ${fighterFullName}`;
            }

            if(key.split('round')[1] === props.match.params.roundId) {
                console.log("here");
                if(round.result === 'win') {
                    imgClassnames.push(styles.wonCurrent);
                } else if(round.result === 'lost') {
                    imgClassnames.push(styles.lostCurrent);
                } 
                imgClassnames.push(styles.currentRound);
            }


            return (
                <div className={styles.fighterRow} key={key}>
                    <img 
                        className={imgClassnames.join(' ')}
                        title={title}
                        src={`./../../assets/images/${fighterFullName}.png`} />
                </div>
            )
        })

        roundNames = Object.keys(rounds).map(key => {
            return (
                <div key={key}>
                    <span>{`Round ${key.split('round')[1]}`}</span>
                </div>
            )
        });
        

        return (
            <div className={styles.roundRow} key={key}>
                {elements}
            </div>
        );
    })

    return (
        <div className={styles.roundPageContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.pageTitle}>{`Division ${props.location.state.division.slice(-1)}`}</p>
                <span 
                    className={styles.link}
                    onClick={() => history.push(`/divisions/${props.location.state.division.slice(-1)}`)}>
                    Back to {`Division ${props.location.state.division.slice(-1)}`} table
                </span>
            </div>
            <div className={styles.roundNames}>
                {roundNames}
            </div>
            <div className={styles.roundContainer}>
                <div className={styles.mainFightersCol}>
                    {fightersColumn}
                </div>
                <div className={styles.fighterRoundsContainer}>
                    {roundColumn}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(round);

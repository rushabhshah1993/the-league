import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './DivisionRound.scss';

import Modal from './../../common/Modal/Modal';
import ChooseWinner from '../ChooseWinner/ChooseWinner';

import {
    sortDivisionByPoints
} from './../DivisionTableRanking/utility';

const DivisionRound = props => {
    const [roundElement, setRoundElements] = useState([]);
    const [roundNumber, setCurrentRound] = useState(null);
    const [modalDisplay, showModal] = useState(null);
    const [modalFighters, setModalFighters] = useState(null);
    const [modalFightId, setModalFightId] = useState(null);
    const history = useHistory();
    let finalTable = null;

    let currentDivision = props.rounds[props.divisionId];
    let currentRound = [];
    if(currentDivision !== undefined) {
        for(let round in currentDivision) {
            if(currentDivision[round].current === true) {
                currentRound = currentDivision[round].fights;
                break;
            }
        }

        if(roundNumber === null) setCurrentRound(props.divisions[props.divisionId]?.currentRound);
    }


    if(currentRound.length > 0 
        && Object.keys(props.fighters).length > 0 
        && Object.keys(props.fighterImgs).length > 0) {
        let htmlElement = currentRound.map((fight, count) => {
            let fighter1 = props.fighters[fight.fighter1];
            let fighter2 = props.fighters[fight.fighter2];
            let winner = fight.winner ? props.fighters[fight.winner] : null;

            return (
                <div className={styles.roundFightContainer} key={`fight${count}`}>
                    <div className={styles.roundFight}>
                        <div className={styles.roundFighter}>
                            <img 
                                // src={`./../../assets/images/${fighter1.firstName} ${fighter1.lastName}.png`}
                                src={props.fighterImgs[`${fighter1.firstName} ${fighter1.lastName}`]}
                                className={styles.fighterImg} />
                            <p>{fighter1.firstName}</p>
                        </div>
                        <p className={styles.vsText}>vs</p>
                        <div className={[styles.roundFighter, styles.fighter2].join(' ')}>
                            <img 
                                // src={`./../../assets/images/${fighter2.firstName} ${fighter2.lastName}.png`}
                                src={props.fighterImgs[`${fighter2.firstName} ${fighter2.lastName}`]}
                                className={styles.fighterImg} />
                            <p>{fighter2.firstName}</p>
                        </div>
                    </div>
                    <div className={styles.actionBtn}>
                        {
                            winner!==null ?
                            (
                                <div className={styles.winner}>
                                    <img 
                                        // src={`./../../assets/images/${winner.firstName} ${winner.lastName}.png`}
                                        src={props.fighterImgs[`${winner.firstName} ${winner.lastName}`]}
                                        className={styles.fighterImg} />
                                    <p>{winner.firstName}</p>
                                </div>
                            ) :
                            (
                                <div 
                                    className={styles.chooseWinner} 
                                    onClick={(event) => showWinnersModal(event)}
                                    data-fighters={JSON.stringify({
                                        fighter1: fighter1,
                                        fighter2: fighter2
                                    })}
                                    fightid={fight.id}>
                                    Choose
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        })

        
        if(roundElement.length === 0) setRoundElements(htmlElement);
    } else {
        if(Object.keys(props.rounds).length > 0) {
            let currentRound = props.divisions[props.divisionId]?.currentRound;
            let divisionTotalRounds = Object.keys(props?.rounds[props?.divisionId]).length;
            if((currentRound > divisionTotalRounds) && Object.keys(props.fighters).length > 0) {
                console.log("Division is over", props.fighters);
                let finalRankings = sortDivisionByPoints(props.divisions[props.divisionId].points, props.fighters);
                console.log(finalRankings);
                let finalRankingItem = finalRankings.map(fighter => {
                    return (
                        <li key={fighter.id} style={{display: 'flex'}}>
                            <img 
                                src={props.fighterImgs[`${fighter.firstName} ${fighter.lastName}`]}
                                className={styles.fighterImg} />
                            <p>{fighter.firstName} {fighter.lastName}</p>
                        </li>
                    )
                })
                finalTable = <ul>{finalRankingItem}</ul>;
            }
        }
    }

    const showWinnersModal = event => {
        setModalFighters(JSON.parse(event.target.getAttribute("data-fighters")));
        setModalFightId(event.target.getAttribute("fightid"));
        showModal(true);
    }

    const updatedRoundWinner = () => {
        showModal(false);
        // location.reload();
    }

    const navigateToRounds = () => {
        history.push(`/rounds/${roundNumber}`, {division: props.divisionId});
    }
 
    return (
        <>
            {
                finalTable === null ?
                (
                    <>
                        <Modal 
                            show={modalDisplay} 
                            body={<ChooseWinner data={modalFighters} fightId={modalFightId} close={updatedRoundWinner} />} 
                            cancel={() => showModal(false)}
                            closeSymbol={true}
                            header={'Choose Winner'} />
                        <div className={styles.divisionRoundContainer}>
                            <div className={styles.roundInfo}>
                                <span>Round {roundNumber}</span>
                                <span 
                                    className={styles.viewRounds}
                                    onClick={navigateToRounds}>
                                    View all rounds for Division {props.divisionId.slice(-1)}
                                </span>
                            </div>
                            <div className={styles.roundContent}>
                                {roundElement}
                            </div>
                        </div>
                    </>
                ) :
                finalTable
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        rounds: state.rounds,
        fighters: state.fighters,
        divisions: state.divisions,
        fighterImgs: state.fighterImgs
    }
}

export default connect(mapStateToProps)(DivisionRound);

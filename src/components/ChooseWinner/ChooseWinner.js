import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './ChooseWinner.scss';

import { updateFighterRoundResult } from './../../actions/fightersActions';
import { addDivisionPoints } from './../../actions/divisionsActions';
import { addRoundPoints } from './../../actions/tableActions';
import { setRoundsResult } from './../../actions/roundsActions';

const ChooseWinner = props => {
    const [selectedFighter, chooseWinner] = useState(null);
    const [chosenWinnerName, chooseWinnerName] = useState(null);
    let chosenFighter = useRef(null);
    let fighter1Ref = useRef(null);
    let fighter2Ref = useRef(null);
    let fighter1 = props?.data?.fighter1;
    let fighter2 = props?.data?.fighter2;

    const selectFighter = event => {
        event.target.className = [styles.fighterImg, styles.choosenFighter].join(' ');
        chooseWinner(event.target.id);
        chooseWinnerName(event.target.getAttribute('name'));
    }

    const finaliseWinner = () => {
        let fightInfo = props.fightId.split("-");
        let divisionId = `division${fightInfo[0].slice(-1)}`;
        let roundId = `round${fightInfo[1].split("R")[1]}`;

        let incompleteFights = props.rounds[divisionId][roundId].fights.filter(fight => fight.winner === false);
        let lastFightOfTheRound = incompleteFights.length === 1;
        let loserFighter = selectedFighter === fighter1.id ? fighter2.id : fighter1.id;

        updateFighterData(selectedFighter, roundId);
        updateRoundsData(divisionId, roundId, props.fightId, selectedFighter);
        updateDivisionsData(divisionId, selectedFighter, roundId, lastFightOfTheRound);
        updateTableData(divisionId, roundId, selectedFighter, lastFightOfTheRound, loserFighter);
        props.close();
    }
    
    const updateFighterData = (fighterId, roundId) => {
        props.fighters[fighterId].rounds[roundId].result = "win";
        props.fighters[fighterId].lastRoundGained = +roundId.split("round")[1];
        props.fighters[fighterId].fights.total += 1;
        props.fighters[fighterId].fights.won += 1;
        props.fighters[fighterId].fights.winPercent = 
        (props.fighters[fighterId].fights.won/props.fighters[fighterId].fights.total)*100;
        
        for(let key in props.data) {
            if(props.data[key].id !== fighterId) {
                let loserId = props.data[key].id;
                props.fighters[loserId].rounds[roundId].result = "lost";
                props.fighters[loserId].fights.total += 1;
                props.fighters[loserId].fights.winPercent = 
                (props.fighters[loserId].fights.won/props.fighters[loserId].fights.total)*100;
            }
        }

        props.updateFighterResult(props.fighters);
    }
    
    const updateRoundsData = (divisionId, roundId, fightId, winnerId) => {
        const currentDivision = props.rounds[divisionId]; 
        let roundFights = currentDivision[roundId].fights.map(fight => {
            if(fight.id === fightId) fight.winner = winnerId;
            return fight;
        })
        currentDivision[roundId].fights = roundFights;
        let roundComplete = roundFights.every(fight => fight.winner !== false);
        if(roundComplete) {
            currentDivision[roundId].current = false;
            // let nextRound = `round${+roundId.slice(-1) + 1}`;
            let nextRound = `round${+roundId.split("round")[1] + 1}`;
            if(currentDivision[nextRound] === undefined) {
                console.log("Division over");
            } else {
                currentDivision[roundId].current = false;
                currentDivision[nextRound].current = true;
            }
        }
        props.setRoundsResult(props.rounds);
    }

    const updateDivisionsData = (divisionId, fighterId, roundId, lastFightOfTheRound) => {
        let pointsData = props.divisions[divisionId].points;
        pointsData[fighterId] += 3;
        if(lastFightOfTheRound) {
            // props.divisions[divisionId].currentRound = +roundId.slice(-1) + 1;
            props.divisions[divisionId].currentRound = +roundId.split("round")[1] + 1;
        }

        props.addDivisionPoints(props.divisions);
        //Ranking logic to be defined
        // for(let fighter in pointsData) {
            
        // }
    }

    const updateTableData = (divisionId, roundId, winnerId, lastFightOfTheRound, loserId) => {
        props.table[divisionId][roundId][winnerId] += 3;
        props.table[divisionId][roundId][loserId] += 0;
        if(lastFightOfTheRound) {
            // let nextRoundId = `round${+roundId.slice(-1) + 1}`;
            let nextRoundId = `round${+roundId.split("round")[1] + 1}`;
            props.table[divisionId][nextRoundId] = props.table[divisionId][roundId];
        }
        props.addRoundPointsToTable(props.table);
    }  

    // const moveToNextRound = (divisionId, nextRoundId, currentRoundId) => {
    //     props.divisions[divisionId].currentRound = +nextRoundId.slice(-1);
    //     // props.updateDivisionsToNextRound(props.divisions);
    //     props.table[divisionId][nextRoundId] = props.table[divisionId][currentRoundId];
    //     // props.updateTableToNextRound(props.table);
    // }

    useEffect(() => {
        if(chosenWinnerName) chosenFighter.current.style.display = "flex";
    }, [chosenWinnerName]);

    useEffect(() => {
        chooseWinner(null);
        chooseWinnerName(null);
        fighter1Ref.current.className = styles.fighterImg;
        fighter2Ref.current.className = styles.fighterImg;
        chosenFighter.current.style.display = "none";
    }, [JSON.stringify(props.data)])
    

    return (
        <div className={styles.chooseWinnerContainer}>
            <div className={styles.fightersContainer}>
                <div className={styles.fighter}>
                    <img 
                        // src={`./../../assets/images/${fighter1?.firstName} ${fighter1?.lastName}.png`}
                        src={props.fighterImgs[`${fighter1?.firstName} ${fighter1?.lastName}`] || null}
                        className={styles.fighterImg}
                        onClick={selectFighter} 
                        id={fighter1?.id} 
                        name={fighter1?.firstName}
                        ref={fighter1Ref} />
                    <span>{fighter1?.firstName} {fighter1?.lastName}</span>
                </div>
                <div className={styles.orText}>OR</div>
                <div className={styles.fighter}>
                    <img 
                        // src={`./../../assets/images/${fighter2?.firstName} ${fighter2?.lastName}.png`}
                        src={props.fighterImgs[`${fighter2?.firstName} ${fighter2?.lastName}`] || null}
                        className={styles.fighterImg}
                        onClick={selectFighter} 
                        id={fighter2?.id} 
                        name={fighter2?.firstName}
                        ref={fighter2Ref} />
                    <span>{fighter2?.firstName} {fighter2?.lastName}</span>
                </div>
            </div>
            <div className={styles.winnerFooter} ref={chosenFighter}>
                <span>You've choosen {chosenWinnerName}</span>
                <div className={styles.button} onClick={finaliseWinner}>
                    Is {chosenWinnerName} the winner?
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        updateFighterResult: list => dispatch(updateFighterRoundResult(list)),
        addDivisionPoints: list => dispatch(addDivisionPoints(list)),
        addRoundPointsToTable: list => dispatch(addRoundPoints(list)),
        setRoundsResult: list => dispatch(setRoundsResult(list)),
        updateTableToNextRound: list => dispatch(addRoundPoints(list)),
        updateDivisionsToNextRound: list => dispatch(addDivisionPoints(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWinner);

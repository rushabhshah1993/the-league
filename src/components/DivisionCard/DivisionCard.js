import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './DivisionCard.scss';

const DivisionCard = props => {
    const [leader, setLeader] = useState(null);
    const [imgPath, setImgPath] = useState(null);
    const history = useHistory();

    if(Object.keys(props.fighters).length > 0 && !leader) {
        let leader = props.fighters[props.division.leader];
        setLeader(leader);
    }

    useEffect(() => {
        if(Object.keys(props.fighterImgs).length > 0) {
            let imgPath = props.fighterImgs[`${leader.firstName} ${leader.lastName}`];
            setImgPath(imgPath);
        }    
    }, [props.fighterImgs])
    
    const navigateToDivision = () => {
        history.push(`/divisions/${props.division.id}`);
    }

    return (
        <div className={styles.divisionCard} onClick={navigateToDivision}>
            <div className={styles.slantBG}></div>
            <div className={styles.headerSlanted}>
                <p className={styles.divisionName}>{props.division.label}</p>
                <span className={styles.currentRound}>
                    <div className={styles.live}></div>
                    Round {props.division.currentRound}
                </span>
            </div>
            <div className={styles.cardContent}>
                <span className={styles.champNo}>#1</span>
                <p className={styles.fighter}>{leader?.firstName} {leader?.lastName}</p>
            </div>
            <img 
                className={styles.fighterImg}
                src={imgPath} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fighters: state.fighters,
        fighterImgs: state.fighterImgs
    }
}

export default connect(mapStateToProps)(DivisionCard);

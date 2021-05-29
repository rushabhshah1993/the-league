import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './fighters.scss';

const fighters = props => {
    const [activeTab, setActiveTab] = useState('division1');
    const history = useHistory();

    let tabButtons = Object.keys(props.divisions).map(division => {
        let classNames = [styles.tabBtn];
        if(division === activeTab) classNames.push(styles.active);

        return (
            <div 
                key={division} 
                className={classNames.join(' ')} 
                onClick={() => setActiveTab(division)}>
                {props.divisions[division].label}
            </div>
        )
    })

    let activeTabFighters = Object.keys(props.fighters).filter(fighter => 
        props.fighters[fighter].division === +activeTab.slice(-1))
        .reduce((obj, key) => {
            obj[key] = props.fighters[key];
            return obj;
        }, {});

    let fighterElements = Object.keys(activeTabFighters).map(key => {
        let fighter = activeTabFighters[key];
        let fighterId = fighter.id.slice(-3);
        return (
            <div 
                className={styles.fighterCard} 
                key={key} 
                onClick={() => history.push(`/fighters/${fighterId}`)}>
                <div className={styles.slantBG}></div>
                <div className={styles.fighterCardContent}>
                    <div className={styles.fighterImgContainer}>
                        <img 
                            src={`./../../assets/images/${fighter.firstName} ${fighter.lastName}.png`}
                            className={styles.fighterImg} />
                    </div>
                    <div className={styles.fighterInfo}>
                        <div className={styles.fighterName}>
                            <p>{fighter.firstName}</p>
                            <p>{fighter.lastName}</p>
                        </div>
                        <span className={styles.fighterMisc}>{fighter.age}, {fighter.location.city}</span>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.fightersContainer}>
            <div className={styles.titleSection}>
                Fighters
            </div>
            <div className={styles.fightersContent}>
                <div className={styles.tabContainer}>{tabButtons}</div>
                <div className={styles.fighterCardsContainer}>
                    {fighterElements}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fighters: state.fighters,
        divisions: state.divisions
    }
}

export default connect(mapStateToProps)(fighters);

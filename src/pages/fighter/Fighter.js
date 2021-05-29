import React, { useState } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';

import styles from './fighter.scss';
import FighterBodyImg from './FighterBodyImg/FighterBodyImg';
import FightsSection from './FightsSection/FightsSection';

const Fighter = props => {
    const [mobileView, toggleMobileView] = useState(window.outerWidth < 415);
    const [activeTab, setActiveTab] = useState('stats');
    const tabs = [
        {
            id: 'stats',
            name: 'Statistics'
        },
        {
            id: 'fights',
            name: 'Fights'
        }
    ]

    let tabElements = tabs.map(tab => {
        let tabClassNames = [styles.tabItem];
        if(tab.id === activeTab) tabClassNames.push(styles.activeTab);
        return (
            <div 
                key={tab.id} 
                className={tabClassNames.join(' ')}
                onClick={() => setActiveTab(tab.id)}>
                {tab.name}
            </div>
        )
    })


    let content = null;
    if(Object.keys(props.fighters).length > 0) {
        let fighter = props.fighters[`F${props.match.params.fighterId}`];
        let fullName = `${fighter.firstName} ${fighter.lastName}`;
        

        content = (
            <div>
                <div className={styles.header}>
                    <img src={`./../../assets/images/${fullName}.png`} className={styles.fighterImg} />
                    <div className={styles.fighterInfo}>
                        <p className={styles.fighterName}>{fullName}</p>
                        <div className={styles.statsAndInfo}>
                            <div className={styles.fighterLocationDivision}>
                                <p className={styles.fighterLocation}>
                                    {fighter.location.city}, {fighter.location.country}
                                </p>
                                <div className={styles.division}>Division {fighter.division}</div>
                            </div>
                            <div className={styles.fightStats}>
                                <div className={styles.statItem}>
                                    <label>Total Fights</label>
                                    <span>{fighter.fights.total}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <label>Wins</label>
                                    <span>{fighter.fights.won}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <label>Win %</label>
                                    <span>{fighter.fights.winPercent.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.tabs}>
                    { tabElements }
                </div>
                <div className={styles.fighterContent}>
                    {
                        ((activeTab === 'stats' && mobileView) || (!mobileView)) && 
                        <div className={styles.stats}>
                        <p className={styles.sectionTitle}>Statistics</p>
                        <div className={styles.statsContent}>
                            <div className={styles.statSection}>
                                <label>Age:</label>
                                <span>{fighter.age} years</span>
                            </div>

                            <div className={styles.statSection}>
                                <label>Significant Strikes</label>
                                <div className={styles.charts}>
                                    <Chart
                                        width={'300px'}
                                        height={'300px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Strikes', 'Value'],
                                            ['Landed per minute', fighter.stats.ss.lpm],
                                            ['Absorbed per minute', fighter.stats.ss.abm],
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            legend: 'bottom'
                                        }}
                                    />
                                    <Chart
                                        width={'300px'}
                                        height={'300px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Strike Accuracy', 'Value'],
                                            ['Accuracy', fighter.stats.ss.accuracy],
                                            ['Failed to hit the target', 100-fighter.stats.ss.accuracy],
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            legend: 'bottom',
                                            slices: {
                                                0: {color: 'blue'},
                                                1: {color: 'grey'}
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={styles.statSection}>
                                <FighterBodyImg strikes={fighter.stats.positions} fighter={fighter.firstName} />
                            </div>
                        </div>
                    </div>
                    }
                    {
                        ((activeTab === 'fights' && mobileView) || (!mobileView)) &&
                        <div className={styles.fights}>
                            <p className={styles.sectionTitle}>Fights</p>
                            <FightsSection fights={fighter.rounds} fighterId={fighter.id} />
                        </div>
                    }
                </div>
            </div>
        )
    }


    return (
        <div className={styles.fighterContainer}>
            {/* <div> */}
                {/* <img src={`./../../assets/images/${fullName}.png`} className={styles.fighterImg} /> */}
                { content }
            {/* </div> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fighters: state.fighters
    }
}

export default connect(mapStateToProps)(Fighter);

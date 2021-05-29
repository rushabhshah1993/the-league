import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createTableData } from './utility';

import styles from './DivisionTableRanking.scss';

import {
    updateDivisionLeader
} from './../../actions/divisionsActions';

const DivisionTableRanking = props => {
    // console.log(props);

    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableBody, setTableBody] = useState([]);

    let divisionData = props.divisions[props.divisionId];

    if(divisionData !== undefined) {
        let tableData = createTableData(divisionData, props.fighters);
        if(tableData.length > 0) {
            let headers = Object.keys(tableData[0]);
            headers.unshift('rank');
            headers.splice(-2);
            let tableHeaderElement = headers.map(header => <th key={header}>{header}</th>);
            if(tableHeaders.length === 0) setTableHeaders(tableHeaderElement);
            // console.log(props.divisionId.split('division')[1], tableData[0].id);
            // console.log(divisionData.leader, tableData[0].id);
            if(divisionData.leader !== tableData[0].id)
                props.updateDivisionLeader(props.divisionId, tableData[0].id);

            let tableBodyElement = tableData?.map((fighter, count) => {
                return (
                    <tr key={fighter.name}>
                        <td>{count+1}</td>
                        <td>
                            <div className={styles.fighterInfo}>
                                <div className={styles.imageCropper}>
                                    <img src={`./../../assets/images/${fighter.name}.png`} className={styles.fighterImg} />
                                </div>
                                <span>{fighter.name}</span>
                            </div>
                        </td>
                        <td>{fighter.total}</td>
                        <td>{fighter.win}</td>
                        <td>{fighter.points}</td>
                    </tr>
                )
            })
            if(tableBody.length === 0) setTableBody(tableBodyElement);
        }
    }


    return (
        <div className={styles.divisionTableContainer}>
            <table className={styles.tableWrap}>
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fighters: state.fighters,
        divisions: state.divisions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateDivisionLeader: (divisionId, leaderId) => dispatch(updateDivisionLeader(divisionId, leaderId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DivisionTableRanking);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import Home from './../home/Home';
import Division from './../division/Division';
import Fighters from '../fighters/Fighters';
import Fighter from './../fighter/Fighter';
import Round from './../round/Round';
import Navbar from '../../common/Navbar/Navbar';

import {
    fetchDivisionsData
} from './../../actions/divisionsActions';
import {
    fetchFightersList
} from './../../actions/fightersActions';
import {
    fetchAllRounds
} from './../../actions/roundsActions';
import {
    fetchDivisionTable
} from './../../actions/tableActions';
import axios from 'axios';

const Layout = props => {
    useEffect(() => {
        props.fetchDivisions();
        props.fetchFighters();
        props.fetchRounds();
        props.fetchTableData();
    }, [])

    return (
        <div>
            <Navbar />
            <Switch>
                <Route path="/divisions/:divisionId" exact component={Division} />
                <Route path="/fighters" exact component={Fighters} />
                <Route path={'/fighters/:fighterId'} exact component={Fighter} />
                <Route path={'/rounds/:roundId'} exact component={Round} />
                <Route path={'/'} exact component={Home} />
            </Switch>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDivisions: () => dispatch(fetchDivisionsData()),
        fetchFighters: () => dispatch(fetchFightersList()),
        fetchRounds: () => dispatch(fetchAllRounds()),
        fetchTableData: () => dispatch(fetchDivisionTable())
    }
}

export default connect(null, mapDispatchToProps)(Layout);

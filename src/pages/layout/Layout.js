import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import Home from './../home/Home';
import Division from './../division/Division';
import Fighters from '../fighters/Fighters';
import Fighter from './../fighter/Fighter';
import Round from './../round/Round';
import Navbar from '../../common/Navbar/Navbar';
import Articles from './../articles/Articles';
import Article from './../article/Article';

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
import {
    updateFighterImgs
} from './../../actions/fighterImgActions';
import {
    fetchNews
} from './../../actions/newsActions';

const Layout = props => {
    useEffect(() => {
        props.fetchDivisions();
        props.fetchFighters();
        props.fetchRounds();
        props.fetchTableData();
        props.fetchNews();
    }, [])

    useEffect(() => {
        if(Object.keys(props.fighters).length > 0) {
            let obj = {};
            for(let fighterId in props.fighters) {
                let fighter = props.fighters[fighterId];
                let fighterName = `${fighter.firstName} ${fighter.lastName}`;
                import(`./../../assets/images/${fighterName}.png`).then(response => {
                    obj[fighterName] = response.default;
                    if(Object.keys(obj).length === Object.keys(props.fighters).length) {
                        props.updateFighterImgs(obj);
                    }
                })
            }
        }
    }, [props.fighters])

    return (
        <div>
            <Navbar />
            <Switch>
                <Route path="/divisions/:divisionId" exact component={Division} />
                <Route path="/fighters" exact component={Fighters} />
                <Route path={'/fighters/:fighterId'} exact component={Fighter} />
                <Route path={'/rounds/:roundId'} exact component={Round} />
                <Route path={'/articles'} exact component={Articles} />
                <Route path={'/article/:articleId'} exact component={Article} />
                <Route path={'/'} exact component={Home} />
            </Switch>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fighters: state.fighters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDivisions: () => dispatch(fetchDivisionsData()),
        fetchFighters: () => dispatch(fetchFightersList()),
        fetchRounds: () => dispatch(fetchAllRounds()),
        fetchTableData: () => dispatch(fetchDivisionTable()),
        fetchNews: () => dispatch(fetchNews()),
        updateFighterImgs: fighters => dispatch(updateFighterImgs(fighters))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

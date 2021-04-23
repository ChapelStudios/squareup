import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import './custom.css'
import People from './components/People';
import Expenses from './components/Expenses';
import SquareUp from './components/SquareUp';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from './context/AppContext';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '900px',
    },
    loneBox: {
        padding: '25px',
        height: '100%',
        width: '100%',
        textAlign: 'center',
    },
}));

const App = () => {
    const classes = useStyles();
    const { people, expenses } = useContext(AppContext);
    const { pathname } = useLocation();

    const showPeople = people.length === 0
        && pathname !== '/People';

    const showExpenses = expenses.length === 0
        && people.length > 0
        && pathname !== '/Expenses';

    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Route exact path='/' component={SquareUp} />
                    <Route path='/People' component={People} />
                    <Route path='/Expenses' component={Expenses} />
                </Grid>
                {showPeople && (
                    <Paper className={classes.loneBox}>
                        <h3>Start by <Link to="/People">Adding People</Link></h3>
                    </Paper>
                )}

                {showExpenses && (
                    <Paper className={classes.loneBox}>
                        <h3><Link to="/Expenses">Add Some Expenses</Link></h3>
                    </Paper>
                )}
            </Grid>
        </Layout>
    );
}

export default App;
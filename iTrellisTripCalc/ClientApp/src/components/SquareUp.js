import React, { useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../context/AppContext';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '900px',
    },
    paper: {
        padding: '10px',
        width: '100%',
        height: '100%',
    },
    heading: {
        height: '50%',
    },
}));

const SquareUp = () => {
    const classes = useStyles();
    const { people, expenses } = useContext(AppContext);

    const totals = useMemo(() => {
        const result = {};
        people.forEach(({ name }) => {
            result[name] = getTotal(name)
        });

        return result;

        function getTotal(name) {
            return expenses.reduce((total, next) =>
                next.payer === name
                    ? total + next.amount
                    : total,
                0);
        }
    }, [people, expenses])

    const tripTotal = useMemo(() => expenses.reduce((total, next) => total + next.amount, 0), [expenses]);

    const getSquareUpAmount = (resultName) => {
        const resultTotal = totals[resultName];
        const equalShare = Math.round((tripTotal / people.length) * 100) / 100;

        return (equalShare - resultTotal).toFixed(2);
    };

    return (
        <Grid item container className={classes.root} spacing={3} xs={12}>
            {people.map(({ name }, i) => (
                <Grid item key={i} xs>
                    <Paper className={classes.paper}>
                        <h2 className={classes.heading}>{name}</h2>
                        <p>Total Covered: ${totals[name]}</p>
                        <p>Amount to Square Up: ${getSquareUpAmount(name)}</p>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}

export default SquareUp;

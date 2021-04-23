import React, { useContext, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../context/AppContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverRounded from '@material-ui/icons/DeleteForeverRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '500px',
    },
    paper: {
        padding: '10px',
    },
    list: {
        width: '100%',
    },
    expenseField: {
        width: '100%',
    },
}));

const Expenses = () => {
    const { people, expenses, addExpense, removeExpense } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedPayer, setSelectedPayer] = useState('');
    const classes = useStyles();

    const handleAmountChange = ({ target: { value } }) => {
        const intVal = parseFloat(value);
        if (!isNaN(intVal)) {
            setAmount(intVal);
        }
        else {
            setAmount('');
        }
    }

    const handleSelectedPayerChange = (e) => {
        const { target: { value } } = e
        setSelectedPayer(value);
    }

    const doAdd = () => {
        const isTitleValid = title !== '';
        const isPayerValid = selectedPayer !== ''
        const isAmountValid = !isNaN(amount) && amount !== 0;
        if (isTitleValid && isPayerValid && isAmountValid) {
            addExpense({
                title,
                payer: selectedPayer,
                amount
            });
            setTitle('');
            setAmount('');
            setSelectedPayer('');
        }
    }

    const doRemove = (expense) => {
        removeExpense(expense);
    }

    return (
        <Grid container
            direction="column"
            className={classes.root}
            justify="flex-start"
            spacing={4}
        >
            <Grid item>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h3>Add a new expense:</h3>
                        </Grid>
                        <Grid item container
                            direction="column"
                            xs={9}
                            spacing={3}
                        >
                            <Grid item>
                                <TextField label="Title"
                                    className={classes.expenseField}
                                    placeholder="E.G. Gas"
                                    variant="outlined"
                                    required
                                    value={title}
                                    onChange={({ target: { value } }) => setTitle(value)}
                                    inputProps={{
                                        "aria-label": 'Title'
                                    }}
                                    size="small"
                                />
                            </Grid>
                            <Grid item>
                                <TextField label="Amount"
                                    placeholder="0.00"
                                    variant="outlined"
                                    className={classes.expenseField}
                                    required
                                    value={amount}
                                    onChange={handleAmountChange}
                                    size="small"
                                    inputProps={{
                                        "aria-label": 'Amount'
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" >$</InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField select label="Payer"
                                    className={classes.expenseField}
                                    value={selectedPayer}
                                    onChange={handleSelectedPayerChange}
                                    variant="outlined"
                                    size="small"
                                    required
                                    inputProps={{
                                        "aria-label": 'Payer',
                                        "data-testid": 'Payer',
                                        id: 'Payer'
                                    }}
                                >
                                    <MenuItem value='' disabled>Choose...</MenuItem>
                                    {people.map(({ name }, i) => (
                                        <MenuItem value={name} key={i}>{name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid item
                            xs={3}
                            alignItems="center"
                            container
                            justify="center"
                        >
                            <Button variant="outlined" onClick={doAdd}>Add</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <h3>Expenses for the Trip</h3>
                <Table aria-label="people" className={classes.list}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Payer</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {expenses.map((expense, i) => (
                        <TableRow key={i}>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell>{expense.payer}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell onClick={() => doRemove(expense)}>
                                <IconButton size="small" aria-label="delete" title="Delete">
                                    <DeleteForeverRounded />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}

export default Expenses;
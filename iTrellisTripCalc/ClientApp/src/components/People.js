import React, { useContext, useState, Fragment } from 'react'
import AppContext from '../context/AppContext';
import DeleteForeverRounded from '@material-ui/icons/DeleteForeverRounded';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '500px',
    },
    paper: {
        padding: '10px',
    },
    list: {
        width: '100%',
    }
}));


const People = () => {
    const { people, addPerson, removePerson } = useContext(AppContext);
    const [name, setName] = useState('');

    const classes = useStyles();

    const doAdd = () => {
        if (name !== '') {
            addPerson({
                name
            });
            setName('');
        }
    }

    const doRemove = (name) => {
        removePerson(name);
    }

    return (
        <Grid container
            direction="column"
            className={classes.root}
            justify="flex-start"
        >
            <Grid item>
                <Paper className={classes.paper}>
                    <Grid container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <h3>Add a new person:</h3>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                label="Name"
                                placeholder="Name"
                                variant="outlined"
                                required
                                value={name}
                                onChange={({ target: { value } }) => setName(value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                                <Button variant="outlined" onClick={doAdd}>Add</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <List aria-label="people" className={classes.list}>
                    {people.map(({ name }, i) => (
                        <Fragment key={i}>
                            {i > 0 && <Divider />}
                            <ListItem>
                                <ListItemText>{name}</ListItemText>
                                <ListItemIcon onClick={() => doRemove(name)}>
                                    <IconButton size="small" aria-label="delete" title="Delete">
                                        <DeleteForeverRounded />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        </Fragment>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}

export default People;
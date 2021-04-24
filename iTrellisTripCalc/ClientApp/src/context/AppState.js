import React, { useReducer } from 'react';
import AppContext from './AppContext';
import AppReducer, { AppActions } from './AppReducer';
import { testPeople, testExpenses } from '../testUtils/utils';

const AppState = ({ children }) => {
    const initialState = {
        people: [
            //...testPeople,
        ],
        expenses: [
            //...testExpenses,
        ]
    };

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const addPerson = (person) => {
        dispatch({
            type: AppActions.ADD_PERSON,
            payload: person
        });
    }

    const removePerson = (name) => {
        dispatch({
            type: AppActions.REMOVE_PERSON,
            payload: name
        });
    }

    const addExpense = (expense) => {
        dispatch({
            type: AppActions.ADD_EXPENSE,
            payload: expense
        });
    }

    const removeExpense = (expense) => {
        dispatch({
            type: AppActions.REMOVE_EXPENSE,
            payload: expense
        });
    }

    return (
        <AppContext.Provider value={{
            people: state.people,
            addPerson,
            removePerson,
            expenses: state.expenses,
            addExpense,
            removeExpense,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppState;
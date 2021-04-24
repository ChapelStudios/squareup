import React from 'react';
import AppContext from "../context/AppContext";
import AppState from "../context/AppState";
import { render } from '@testing-library/react'

export const renderWithContextProps = (ui, providerProps, ...renderOptions) => {
    return render(
        <AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>,
        renderOptions
    );
}

export const renderWithInitialState = (ui, ...renderOptions) => {
    return render(
        <AppState>{ui}</AppState>,
        renderOptions
    );
}

const testName = 'Testor McTestington';
const testName2 = 'Tester X';
const testName3 = 'T35t0r';
const amount1 = 123;
const amount2 = 48.47;
const amount3 = 484.10;
const amount4 = 54;
const amount5 = 63.14;
const testTitle1 = 'Test Expense 1';
const testTitle2 = 'Test Expense 2';
const testTitle3 = 'Test Expense 3';
const testTitle4 = 'Test Expense 4';
const testTitle5 = 'Test Expense 5';
export const testPeople = [
    {
        name: testName
    },
    {
        name: testName2
    },
    {
        name: testName3
    }
];

export const testExpenses = [
    {
        title: testTitle1,
        payer: testName,
        amount: amount1
    },
    {
        title: testTitle2,
        payer: testName2,
        amount: amount2
    },
    {
        title: testTitle3,
        payer: testName,
        amount: amount3
    },
    {
        title: testTitle4,
        payer: testName2,
        amount: amount4
    },
    {
        title: testTitle5,
        payer: testName3,
        amount: amount5
    }
];

export const getTestData = (jest) => ({
    testName,
    testName2,
    testName3,
    amount1,
    amount2,
    amount3,
    amount4,
    amount5,
    testTitle1,
    testTitle2,
    testTitle3,
    testTitle4,
    testTitle5,
    testingState: {
        value: {
            people: testPeople,
            expenses: testExpenses,
            addPerson: jest.fn(),
            removePerson: jest.fn(),
            addExpense: jest.fn(),
            removeExpense: jest.fn(),
        }
    },
});
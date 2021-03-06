import React, { Fragment, useContext } from 'react';

import { fireEvent, screen } from '@testing-library/react';
import AppContext from './AppContext';
import { renderWithInitialState, getTestData } from '../testUtils/utils';
import '@testing-library/jest-dom/extend-expect';


describe("trip calc state", () => {
    const { testName, testTitle1, amount1 } = getTestData(jest);
    const fakeExpense = {
        title: testTitle1,
        payer: testName,
        amount: amount1,
    };

    const PeopleTestComponent = () => {
        const { people, removePerson, addPerson } = useContext(AppContext);

        return (<Fragment>
            <div data-testid="people-length">{people.length}</div>
            <button onClick={() => {
                addPerson({
                    name: testName
                });
            }}>Add</button>
            <button onClick={() => {
                removePerson(testName);
            }}>Remove</button>
        </Fragment>);
    }


    const ExpenseTestComponent = () => {
        const { expenses, removeExpense, addExpense } = useContext(AppContext);

        return (<Fragment>
            <div data-testid="expenses-length">{expenses.length}</div>
            <button onClick={() => {
                addExpense(fakeExpense);
            }}>Add</button>
            <button onClick={() => {
                removeExpense(fakeExpense);
            }}>Remove</button>
        </Fragment>);
    }

    const renderPeople = () => renderWithInitialState(<PeopleTestComponent />);
    const renderExpenses = () => renderWithInitialState(<ExpenseTestComponent />);

    it('adds person to people', () => {
        renderPeople();
        expect(screen.getByTestId('people-length')).toHaveTextContent("0");

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(screen.getByTestId('people-length')).toHaveTextContent("1");
    });

    it('removes people by name', () => {
        renderPeople();

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(screen.getByTestId('people-length')).toHaveTextContent("1");

        fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

        expect(screen.getByTestId('people-length')).toHaveTextContent("0");
    });

    it('adds expense to expenses', () => {
        renderExpenses();

        expect(screen.getByTestId('expenses-length')).toHaveTextContent("0");

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(screen.getByTestId('expenses-length')).toHaveTextContent("1");
    });

    it('removes expense from expenses', () => {
        renderExpenses();

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(screen.getByTestId('expenses-length')).toHaveTextContent("1");

        fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

        expect(screen.getByTestId('expenses-length')).toHaveTextContent("0");
    });
})
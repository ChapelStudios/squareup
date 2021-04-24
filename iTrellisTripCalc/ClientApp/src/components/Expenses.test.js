import React from 'react';
import Expenses from './Expenses';

import { fireEvent, screen } from '@testing-library/react'
import { renderWithContextProps, renderWithInitialState, getTestData, testPeople, testExpenses } from '../testUtils/utils';
import '@testing-library/jest-dom/extend-expect';

describe('Expenses Testing', () => {
    const {
        testName,
        testName2,
        amount1,
        amount2,
        testTitle1,
        testTitle2,
        testingState,
    } = getTestData(jest);

    const fauxAddExpense = jest.fn();

    const initWithPeopleState = {
        value: {
            people: testPeople,
            expenses: [],
            addExpense: fauxAddExpense,
        }
    };

    const expenseCount = testExpenses.length;
    const testExpense1 = testExpenses[0];
    const testExpense2 = testExpenses[4];

    const smallTestingState = {
        value: {
            ...testingState.value,
            expenses: [testExpense1, testExpense2],
        }
    }

    const renderInitState = () => renderWithInitialState(<Expenses />);
    const renderWithProps = (props) => renderWithContextProps(<Expenses />, props);

    afterEach(() => jest.clearAllMocks());

    it("renders without crashing", async () => {
        renderInitState();
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("has <tablerow> for each expense", () => {
        renderWithProps(testingState);
        const tableRows = screen.getAllByRole('row');
        expect(tableRows).toHaveLength(expenseCount + 1); // +1 for header
    });

    it('has a delete button for each expense', () => {
        renderWithProps(testingState);
        expect(screen.getAllByTitle('Delete')).toHaveLength(expenseCount)
    });

    it("Displays payers' names", () => {
        renderWithProps(smallTestingState);
        expect(screen.getByText(testExpense1.payer)).toBeInTheDocument();
        expect(screen.getByText(testExpense2.payer)).toBeInTheDocument();
    });

    it("Displays expenses' amounts", () => {
        renderWithProps(smallTestingState);
        expect(screen.getByText(testExpense1.amount.toString())).toBeInTheDocument();
        expect(screen.getByText(testExpense2.amount.toString())).toBeInTheDocument();
    });

    it("Displays expenses' titles", () => {
        renderWithProps(smallTestingState);
        expect(screen.getByText(testExpense1.title)).toBeInTheDocument();
        expect(screen.getByText(testExpense2.title)).toBeInTheDocument();
    });

    it("has a Title field", () => {
        renderInitState();
        expect(screen.getByRole('textbox', { name: 'Title' })).toBeInTheDocument();
    });

    it('updates Title correctly', () => {
        renderInitState();
        const testField = screen.getByRole('textbox', { name: 'Title' })
        fireEvent.change(testField, { target: { value: testTitle1 } });
        expect(testField).toHaveValue(testTitle1);
    });

    it("has an Amount field", () => {
        renderInitState();
        expect(screen.getByRole('textbox', { name: 'Amount' })).toBeInTheDocument();
    });

    it('updates Amount correctly', () => {
        const testVal = 15.55;
        renderInitState();
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: testVal } });
        expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveValue(testVal.toString());
    });

    it('removes amount if Amount is NaN', () => {
        const testVal = 'dsf15.55';
        renderInitState();
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: testVal } });
        expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveValue('');
    });

    it("has a Payer select", () => {
        const { container } = renderInitState();
        expect(container.querySelector('input#Payer')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Payer' })).toBeInTheDocument();
    });

    it('updates selectedPayer correctly', () => {
        renderWithProps(initWithPeopleState);

        const testField = screen.getByTestId('Payer');

        fireEvent.change(testField, { target: { value: testName } });

        expect(testField).toHaveDisplayValue(testName);
    });

    it('has an add expense button', () => {
        renderInitState();
        expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    it('add click creates new expense', () => {
        renderWithProps(initWithPeopleState);

        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: testTitle1 } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: amount2 } });
        fireEvent.change(screen.getByTestId('Payer'), { target: { value: testName } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(fauxAddExpense).toHaveBeenCalledWith({
            payer: testName,
            title: testTitle1,
            amount: amount2
        });
    });

    it('ignores add clicks if title is blank', () => {
        renderWithProps(initWithPeopleState);


        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: '' } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: amount2 } });
        fireEvent.change(screen.getByTestId('Payer'), { target: { value: testName } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(fauxAddExpense).not.toHaveBeenCalled();
    });

    it('ignores add clicks if amount is zero', () => {
        renderWithProps(initWithPeopleState);


        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: testTitle1 } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: 0 } });
        fireEvent.change(screen.getByTestId('Payer'), { target: { value: testName } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(fauxAddExpense).not.toHaveBeenCalled();
    });

    it('ignores add clicks if payor is not chosen', () => {
        renderWithProps(initWithPeopleState);


        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: testTitle1 } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: amount1 } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(fauxAddExpense).not.toHaveBeenCalled();
    });

    it('clears title field after adding a new person', () => {
        renderWithProps(initWithPeopleState);

        const testField = screen.getByRole('textbox', { name: 'Title' });
        fireEvent.change(testField, { target: { value: testTitle1 } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: amount2 } });
        fireEvent.change(screen.getByTestId('Payer'), { target: { value: testName } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(testField).toHaveValue('');
    });

    it('clears amount field after adding a new person', () => {
        renderWithProps(initWithPeopleState);

        const testField = screen.getByRole('textbox', { name: 'Amount' });
        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: testTitle1 } });
        fireEvent.change(testField, { target: { value: amount2 } });
        fireEvent.change(screen.getByTestId('Payer'), { target: { value: testName } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(testField).toHaveValue('');
    });

    it('clears title field after adding a new person', () => {
        renderWithProps(initWithPeopleState);

        const testField = screen.getByTestId('Payer');
        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: testTitle1 } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: amount2 } });
        fireEvent.change(screen.getByTestId('Payer'), { target: { value: testName } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(testField).toHaveValue('');
    });

});

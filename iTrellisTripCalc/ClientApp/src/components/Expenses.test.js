import React from 'react';
import Expenses from './Expenses';

import { fireEvent, screen } from '@testing-library/react'
import { renderWithContextProps, renderWithInitialState, getTestData } from '../testUtils/utils';
import '@testing-library/jest-dom/extend-expect';

describe('Expenses Testing', () => {
    const {
        testPeople,
        testName,
        testName2,
        amount1,
        amount2,
        testTitle1,
        testTitle2,
        fauxAddExpense,
        testingState,
    } = getTestData(jest);

    const initWithPeopleState = {
        value: {
            people: testPeople,
            expenses: [],
            addExpense: fauxAddExpense,
        }
    };

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
        expect(tableRows).toHaveLength(3); // 2 for items + 1 for header
    });

    it('has a delete button for each expense', () => {
        renderWithProps(testingState);
        expect(screen.getAllByTitle('Delete')).toHaveLength(2)
    });

    it("Displays payers' names", () => {
        renderWithProps(testingState);
        expect(screen.getByText(testName)).toBeInTheDocument();
        expect(screen.getByText(testName2)).toBeInTheDocument();
    });

    it("Displays expenses' amounts", () => {
        renderWithProps(testingState);
        expect(screen.getByText(amount1.toString())).toBeInTheDocument();
        expect(screen.getByText(amount2.toString())).toBeInTheDocument();
    });

    it("Displays expenses' titles", () => {
        renderWithProps(testingState);
        expect(screen.getByText(testTitle1)).toBeInTheDocument();
        expect(screen.getByText(testTitle2)).toBeInTheDocument();
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

        expect(fauxAdd).toHaveBeenCalledWith({
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

        expect(fauxAdd).not.toHaveBeenCalled();
    });

    it('ignores add clicks if amount is zero', () => {
        renderWithProps(initWithPeopleState);


        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: testTitle1 } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: 0 } });
        fireEvent.change(screen.getByTestId('Payer'), { target: { value: testName } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(fauxAdd).not.toHaveBeenCalled();
    });

    it('ignores add clicks if payor is not chosen', () => {
        renderWithProps(initWithPeopleState);


        fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: testTitle1 } });
        fireEvent.change(screen.getByRole('textbox', { name: 'Amount' }), { target: { value: amount1 } });

        fireEvent.click(screen.getByRole('button', { name: 'Add' }));

        expect(fauxAdd).not.toHaveBeenCalled();
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

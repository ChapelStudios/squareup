import React from 'react';
import People from './People';

import { fireEvent, screen } from '@testing-library/react'
import { renderWithContextProps, renderWithInitialState, getTestData } from '../testUtils/utils';
import '@testing-library/jest-dom/extend-expect';


describe("People Testing", () => {
    const { testName, testName2, fauxAddPerson } = getTestData(jest);
    const testingState = {
        value: {
            people: [{
                name: testName
            }, {
                name: testName2
            }],
            addPerson: fauxAddPerson,
        }
    };

    const renderInitState = () => renderWithInitialState(<People />);
    const renderWithProps = (props) => renderWithContextProps(<People />, props);

    afterEach(() => jest.clearAllMocks());

    it("renders without crashing", async () => {
        renderInitState();
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("has <li> for each person", () => {
        renderWithProps(testingState);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });

    it('has a delete button for each person', () => {
        renderWithProps(testingState);
        expect(screen.getAllByTitle('Delete')).toHaveLength(2)
    });

    it("Displays peoples names", () => {
        renderWithProps(testingState);
        expect(screen.getByText(testName)).toBeInTheDocument();
        expect(screen.getByText(testName2)).toBeInTheDocument();
    });

    it("has a Name field", () => {
        renderInitState();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('updates name correctly', () => {
        renderInitState();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: testName } });
        expect(screen.getByRole('textbox')).toHaveValue(testName);
    });

    it('ignores add clicks if name is blank', () => {
        const testState = {
            value: {
                people: [],
                addPerson: fauxAdd,
            }
        };
        renderWithProps(testState);
        fireEvent.click(screen.getByRole('button', { name: 'Add' }));
        expect(fauxAdd).not.toHaveBeenCalled();
    });

    it('has an add person button', () => {
        renderInitState();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('add click creates new person', () => {
        renderInitState();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: testName } });
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText(testName)).toBeInTheDocument();
    });

    it('clears name field after adding a new person', () => {
        renderWithProps(testingState);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: testName } });
        fireEvent.click(screen.getByRole('button', { name: 'Add' }));
        expect(screen.getByRole('textbox')).toHaveValue('');
    });
});

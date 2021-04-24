import React from 'react';
import SquareUp from './SquareUp';

import { fireEvent, getByText, screen } from '@testing-library/react'
import { renderWithContextProps, renderWithInitialState, getTestData, testPeople, } from '../testUtils/utils';
import '@testing-library/jest-dom/extend-expect';

describe('Expenses Testing', () => {
    const {
        testingState,
        testName,
        testName2,
        testName3,
    } = getTestData(jest);


    const renderInitState = () => renderWithInitialState(<SquareUp />);
    const renderWithProps = (props) => renderWithContextProps(<SquareUp />, props);

    afterEach(() => jest.clearAllMocks());

    it('renders without crashing', async () => {
        renderInitState();
        await new Promise(resolve => setTimeout(resolve, 1000));
    })

    it("has page for each person", () => {
        renderWithProps(testingState);
        expect(screen.getByRole('heading', { name: testName })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: testName2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: testName3 })).toBeInTheDocument();
    });

    it('renders a total for each person', () => {
        renderWithProps(testingState);

        expect(screen.getByText(607.10, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(102.47, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(63.14, { exact: false })).toBeInTheDocument();
    });

    it('renders a square up amount', () => {
        renderWithProps(testingState);

        expect(screen.getByText(-349.53, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(155.10, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(194.43, { exact: false })).toBeInTheDocument();
    });

});

import React from 'react';
import SquareUp from './SquareUp';

import { fireEvent, screen } from '@testing-library/react'
import { renderWithContextProps, renderWithInitialState, getTestData } from '../testUtils/utils';
import '@testing-library/jest-dom/extend-expect';

describe('Expenses Testing', () => {
    const {
        testingState,

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
        const tableRows = screen.getAllByRole('row');
        expect(tableRows).toHaveLength(3); // 2 for items + 1 for header
    });


});

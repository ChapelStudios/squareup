import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { renderWithInitialState } from './testUtils/utils';

it('renders without crashing', async () => {
    renderWithInitialState(
        <MemoryRouter>
          <App />
        </MemoryRouter>
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
});

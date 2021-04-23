import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';
import AppContext from './AppContext';
import '@testing-library/jest-dom/extend-expect';

describe("AppConext Testing", () => {
    it("renders a provider", async () => {
        render(<AppContext.Provider></AppContext.Provider>);
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("passes values", async () => {
        const TestApp = () => {
            const intVal = useContext(AppContext);
            return <div>{intVal}</div>;
        }
        render(<AppContext.Provider value={1}><TestApp /></AppContext.Provider>);
        expect(screen.getByText("1")).toBeInTheDocument();
    });
});

import AppReducer, { AppActions } from "./AppReducer"

describe("State Reducer Testing", () => {
    const testName = 'Testor McTestington';
    const fakePerson = {
        name: testName
    };
    const fakeExpense = {
        name: testName,
        amount: 15
    };

    it('ignores text types', () => {
        expect(
            AppReducer({
                people: []
            }, {
                type: 'ADD_PERSON',
                payload: fakePerson
            })
        ).toStrictEqual(expect.objectContaining({
            people: expect.not.arrayContaining([fakePerson])
        }));
    });

    // People

    it('handles ADD_PERSON', () => {
        expect(
            AppReducer({
                people: []
            }, {
                type: AppActions.ADD_PERSON,
                payload: fakePerson
            })
        ).toStrictEqual(expect.objectContaining({
            people: expect.arrayContaining([fakePerson])
        }));
    });

    it('handles REMOVE_PERSON', () => {
        expect(
            AppReducer({
                people: [fakePerson]
            }, {
                type: AppActions.REMOVE_PERSON,
                payload: testName
            })
        ).toStrictEqual(expect.objectContaining({
            people: expect.not.arrayContaining([fakePerson])
        }));
    });

    // Expenses

    it('handles ADD_EXPENSE', () => {
        expect(
            AppReducer({
                expenses: []
            }, {
                type: AppActions.ADD_EXPENSE,
                payload: fakeExpense
            })
        ).toStrictEqual(expect.objectContaining({
            expenses: expect.arrayContaining([fakeExpense])
        }));
    });

    it('handles REMOVE_EXPENSE', () => {
        expect(
            AppReducer({
                expenses: [fakeExpense]
            }, {
                type: AppActions.REMOVE_EXPENSE,
                payload: fakeExpense
            })
        ).toStrictEqual(expect.objectContaining({
            expenses: expect.not.arrayContaining([fakeExpense])
        }));
    });
});

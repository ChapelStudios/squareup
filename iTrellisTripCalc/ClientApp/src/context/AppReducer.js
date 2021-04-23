export const AppActions = {
    ADD_PERSON: Symbol('ADD_PERSON'),
    REMOVE_PERSON: Symbol('REMOVE_PERSON'),
    ADD_EXPENSE: Symbol('ADD_EXPENSE'),
    REMOVE_EXPENSE: Symbol('REMOVE_EXPENSE'),
}


const AppReducer = (state, { type, payload }) => {

    switch (type) {
        // People
        case AppActions.ADD_PERSON:
            return {
                ...state,
                people: [...state.people, payload]
            };
        case AppActions.REMOVE_PERSON:
            return {
                ...state,
                people: state.people.filter(({ name }) => name !== payload)
            };

        // Expenses
        case AppActions.ADD_EXPENSE:
            return {
                ...state,
                expenses: [...state.expenses, payload]
            };
        case AppActions.REMOVE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense !== payload)
            };
        default:
            return state;
    }
}

export default AppReducer;
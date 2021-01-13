import React, { createContext, useReducer } from "react";

export const Actions = Object.freeze({
    SET_ACCOUNT_BALANCES: "SET_ACCOUNT_BALANCES",
    SET_INVESTMENT_HISTORY: "SET_INVESTMENT_HISTORY",
    SET_INVESTMENT_SUMMARY: "SET_INVESTMENT_SUMMARY",
    SET_UNIT_PRICES: "SET_UNIT_PRICES",
    SET_USER: "SET_USER"
});

const reducer = (state, action) => {
    switch (action.type) {
        case Actions.SET_ACCOUNT_BALANCES:
            return {
                ...state,
                accountBalances: action.payload
            };
        case Actions.SET_INVESTMENT_HISTORY:
            return {
                ...state,
                investmentHistory: action.payload
            };
        case Actions.SET_INVESTMENT_SUMMARY:
            return {
                ...state,
                investmentSummary: action.payload
            };
        case Actions.SET_UNIT_PRICES:
            return {
                ...state,
                unitPrices: action.payload
            };
        case Actions.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

const initialState = {};

export const Context = createContext(initialState);

export default function Store({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};
    

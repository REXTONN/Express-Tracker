import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios"
// Initial State

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create Global Context
export const GlobalContext = createContext(initialState)

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions

    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions')

            //res.data will give the entire object including success, count and data. So in order to get the data only we will do res.data.data
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {

        try {
            await axios.delete(`/api/v1/transactions/${id}`)
            dispatch({
                type: "DELETE_TRANSACTION",
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }

    }

    async function addTransaction(transaction) {

        // since we are actually sending data we need a content type
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config)
            dispatch({
                type: "ADD_TRANSACTION",
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }


    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
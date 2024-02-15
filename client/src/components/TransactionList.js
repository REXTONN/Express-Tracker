import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transcation from './Transcation'
const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext)
    // since getTransactions is an asynchronous call we will be doing this in useEffect
    useEffect(() => {
        getTransactions();

    }, [])

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transcation key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </>
    )
}

export default TransactionList

import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import logomain from '../../../img/logo.png'
import namew from '../../../img/namew.png'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    const mystyle = {
        color : "#263575",
        fontWeight: "600",
        fontStyle: "italic",   
    }


    return (
        <div className="history-page">
            {
            isAdmin ?
            <>
            <h2>History Of Customer Order</h2>
            <h4>You have {history.length} ordered</h4>
            </>
            :
            <>
            <h2>Your Payment History</h2>
            <h4>You have {history.length} payment bill</h4>
            </>
            }
            <table class="styled-table">
                <thead>
                    <tr>
                        { !isAdmin ?
                        <>
                        <th>Customer</th>
                        </>
                        :
                        <>
                        <th>Username</th>
                        </>
                        }
                        <th>Payment ID</th>
                        <th>Date of Payment</th>
                        {
                            isAdmin ?
                            <>
                            <th>Reciver</th>
                            <th>order status</th>
                            </>
                            : 
                            <>
                            <th>Paid</th>
                            <th>Total</th>
                            <th>Status</th>
                            </>
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                {
                                 !isAdmin ?
                                 <>   
                                <td>{items.name}</td>
                                </>
                                :
                                <>   
                                <td>{items.name}</td>
                                </>
                                }
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                { isAdmin ?
                                <>
                                <td>{items.shipname}</td>
                                <td style={
                                mystyle
                                }>{items.shippingstatus}</td>
                                </>
                                :
                                <>
                                <td>${items.pay}</td>
                                <td>${items.total}</td>
                                <td style={
                                  mystyle
                                }>{items.shippingstatus}</td>
                                </>
                                }
                                <td><Link to={`/history/${items._id}`}>Details</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default OrderHistory

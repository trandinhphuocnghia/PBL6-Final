import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import check from '../../../img/check.svg'
import error from '../../../img/error.svg'
import { store } from 'react-notifications-component';
import done from '../../../img/check3.svg'
import wait from '../../../img/w.svg'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const [shippingstt,setShippingstt] = useState(false)
    const params = useParams()
    const [token] = state.token
    const [stt,setStt] = useState(false)
    //console.log(shippingstt)
    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
                //setShippingstt(item.shippingstatus)
            })
        }
    },[params.id, history])

    const changeshipstt = async () =>{
        try{
         if(orderDetails.shippingstatus === "Waiting"){   
          const shippingstatus =    orderDetails.shippingstatus
          var time = new Date().toLocaleString()   
         const res =  await axios.put(`/api/payment/${orderDetails._id}`,{shippingstatus,time})           
         // setShippingstt(res.data.status)
           //setStt(true)
           console.log(res.data.status)
           window.location.href = "/history";
        }
           else if(orderDetails.shippingstatus === "Xác nhận giao hàng"){
          /*  ;*/
              var time = new Date().toLocaleString()
              const shippingstatus =    orderDetails.shippingstatus
              const res =  await axios.put(`/api/payment/${orderDetails._id}`,{shippingstatus,time})           
              // setShippingstt(res.data.status)
                //setStt(true)
                console.log(res.data.status)
                window.location.href = "/history";
            }
            else{
                store.addNotification({
                    title: "This step was cofirmed!",
                    message: "Please check another!",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2500,
                      onScreen: true
                    },
                    
                  })
            }
           }
        catch(err){

        }
    }

    const changeshipsttdone = async () =>{
        try{
         if(orderDetails.shippingstatus === "Đã xuất kho"){   
            var time = new Date().toLocaleString()
          const shippingstatus = orderDetails.shippingstatus
          const total = orderDetails.total
         const res =  await axios.put(`/api/done/${orderDetails._id}`,{shippingstatus,time,total})           
          // setShippingstt(res.data)
           //setStt(true)
           console.log(res.data.status)
           window.location.href = "/history";}
           else{
            store.addNotification({
                title: "This shipping was cofirmed!",
                message: "On the go",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2500,
                  onScreen: true
                },
                
              });
           }
        }catch(err){

        }
    }

    console.log(shippingstt)
    const mystyle = {
        color : "#263575",
        fontWeight: "600",
        fontStyle: "italic",   
    }

    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <h2>Payment DetailS</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.address.recipient_name}</td>
                        <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>
            <div className="alertship">
            <img className="alerticon" src={check}></img>
            <h3>Thanh toán thành công</h3>
            </div>
            <h2>Details</h2>
            <table style={{margin: "30px 0px 30px 10px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img className="mainimgorder" src={item.mainimg.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.price * item.quantity}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            <div className="alertship warning">
            <h3>Total: ${orderDetails.total}</h3>
            <h3>Đã thanh toán: ${orderDetails.pay}</h3>
             </div>
            <h2>Shipping Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Reciver</th>
                        <th>shipping Address</th>
                        <th>City</th>
                        <th>phone number</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.shipname}</td>
                        <td>{orderDetails.shipaddress}</td>
                        <td>{orderDetails.shipcity+"-"+orderDetails.shipstate}</td>
                        <td>{orderDetails.shipphone}</td>
                        <td className="colorstt" style={
                            mystyle
                        }>{orderDetails.shippingstatus}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Shipping status</h2>
            {
            (()=>{
                if(!isAdmin){
                    if(orderDetails.shippingstatus === "Waiting"){ return(
                                <div className="alertship wait">
                                <img className="alerticon" src={error}></img>
                                <h3>Đang chờ xử lý</h3>
                                </div>)
                    }
                   
                    if(orderDetails.shippingstatus === "Hoàn tất nhận hàng"){
                        return(
                        <div className="alertship ">
                            <img className="alerticon" src={check}></img>
                            <h3>Done</h3>
                            </div> 
                        )    
                    }
                    else{
                        return ( 
                            <div className="alertship ">
                            <img className="alerticon" src={check}></img>
                            <h3>{orderDetails.shippingstatus}: {orderDetails.time}</h3>
                            </div> 
                        )
                    }
                }
            }

            )()
        }

        {
            isAdmin ? 
            <div className="shipstt">
            <div className="shipsttdata"> 
             <h3>Step</h3>      
                {
                    orderDetails.shippingstatus === "Hoàn tất nhận hàng" ?  <img className='shipbtnic' src={done}></img> : <img className='shipbtnic' src={wait}></img> 
                }
            </div>
            <div className="shipsttdata"> 
             <h4>Xác nhận giao hàng</h4>      
            <div className="submitbtn">
            {   orderDetails.shippingstatus === "Waiting" ?   
            <button className="shipbtn" onClick={changeshipstt}>confirm</button>
            : 
               ''
                }
            </div>
            </div>
            <div className="shipsttdata">
            <h4>Xác nhận xuất kho</h4>   
            <div className="submitbtn">
             {   orderDetails.shippingstatus === "Xác nhận giao hàng" ?
            <button className="shipbtn" onClick={changeshipstt}>Confirm</button>
            : ''
             }
            </div>
            </div>
            <div className="shipsttdata">
            <h4>Xác nhận giao hàng thành công</h4>   
            <div className="submitbtn">
            {   orderDetails.shippingstatus === "Đã xuất kho" ?
            <button className="shipbtn" onClick={changeshipsttdone}>Confirm</button>
            : ''
            }
            </div>
            </div>
            </div>
            : ''
        }
        </div>
    )
}

export default OrderDetails

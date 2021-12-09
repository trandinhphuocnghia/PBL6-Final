import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'
import exit from '../../../img/multi.svg'


function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [isCheck,SetIsCheck] = useState(false)
    //get total
    useEffect(() =>{
        
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
       const res = await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })

     //   console.log(res.data)
    }

    const checked = () =>{
      
        SetIsCheck(!isCheck)
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to remove this product from your basket?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)

        }
    }

  /*  const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }*/


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div className="Cartcontainer">


             <h3 className="pagename">Your Cart</h3>
             <div className="tablecontainer">
             <table className="tablecart">
                 <thead>
                     <tr>
                         <th>Product</th>   
                         <th>Name</th>
                         <th>Price</th>
                         <th>Quantities</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>

             {
                cart.map(product => (
                    <tr key={product._id}>
                       <th> <img className="desimgcart" src={product.images[0].url} alt="" /></th>


                            <th className="descriptioncart">
                            <Link id="btn_view_cart" to={`/detail/${product._id}`}>
                                {product.title}
                                </Link>  
                                </th>
                            <th>$ {product.price * product.quantity}</th>
                        
                            <th>
                            <div className="amount">
                                <button className="amountbtn" onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button className="amountbtn" onClick={() => increment(product._id)}> + </button>
                            </div>
                            </th>
                            <th>
                                <img 
                                onClick={() => removeProduct(product._id)}
                                className="removeimg" src={exit} alt="Remove"/>
                            </th>
                    </tr>
                ))
            }
            </tbody>
            </table>
            </div>
           
            <div className="total">
                <h3>Total: $ {total}</h3>
                <div className="select">
                <Link id="btn_select" to="/product" >
                                Continue Shopping
                 </Link>
                 <Link id="btn_checkout" to="/checkout" >
                               Checkout
                 </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart

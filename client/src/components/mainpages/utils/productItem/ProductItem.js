import React, { useContext, useEffect, useState } from 'react'
import BtnRender from './BtnRender'
import Heart from '../../../../img/heart2.svg'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import axios from 'axios'
function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    const state = useContext(GlobalState)
    
    const addWishList = state.userAPI.addWishList
    //const res = Axios.get(`/api/product`)
  
   
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            
            <img src={product.mainimg.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            
           {isAdmin ? '' : 
           <Link id="product_like" to="#!" onClick={() => addWishList(product)}>
           <img src={Heart}></img>
           </Link> }

            
            
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
        }

export default ProductItem

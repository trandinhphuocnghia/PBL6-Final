import React, { useContext, useEffect, useState } from 'react'
import BtnRender from './BtnRender'
import Heart from '../../../../img/heart2.svg'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import moreimg from '../../../../img/mimg.svg'
import sold from '../../../../img/sold.svg'
function ProductItem2({product, isAdmin, deleteProduct, handleCheck}){

    const state = useContext(GlobalState)

    return(
        <div className="product_element">
            {
                isAdmin && <input className="checkproduct" type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            
            <img className="imgmaina" src={product.mainimg.url} alt="" />
            
            <div className="inforbox">
            <h2 title={product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
           
            
            </div>

            

            <div className="inforbtn">
            <BtnRender product={product} deleteProduct={deleteProduct} />
            <div className="moreimg">
            <Link className="btx" to={`/uploadmoreimg/${product.product_id}`}>
            <img  className="mini" src={moreimg}/>
            <p>More images</p>
            </Link>
            </div>
            {
                product.sold >=1 ?
                <img className=" small" src={sold}/>
                : ''
            }
            </div>
        </div>
    )
}
export default ProductItem2
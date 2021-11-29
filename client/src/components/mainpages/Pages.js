import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './products/Home'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import Wlist from './Wishlist/wishlist'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import Checkout from '../checkout/checkout'
import {GlobalState} from '../../GlobalState'
import UserManagement from './usermanagement/usermanagement'
import UploadImg from './createProduct/UploadImg'
import UpdateImg from './createProduct/UpdateImg'
import UploadmImg from './createProduct/UploadmImg'
function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path="/uploadimg/:id" exact component={UploadImg} />
            <Route path="/uploadmoreimg/:id" exact component={UploadmImg} />            
            <Route path="/updateimg/:id" exact component={UpdateImg} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} />
            <Route path="/heart" exact component={Wlist} />    

            <Route path="/checkout" exact component={Checkout} />  
            <Route path="/allusers" exact component={UserManagement}/>
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages

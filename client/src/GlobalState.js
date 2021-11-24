import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import UserSAPI from './api/UserSAPI'
import CategoriesAPI from './api/CategoriesAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    const [buy,setBuy] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        userSAPI: UserSAPI(token),
        categoriesAPI: CategoriesAPI(),
        buy: [buy,setBuy]
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
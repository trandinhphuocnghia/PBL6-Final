import { useState,useEffect } from "react";
import axios from 'axios'

function UserSAPI(token) {
    const [users,SetUserS] = useState([])

    useEffect(() =>{
        if(token){
        const getUsers = async () =>{
            console.log(token)
            const res = await axios.get('/user/allusers',{
                headers: {Authorization: token} 
            })

            SetUserS(res.data.users)
            
        }
        getUsers()
    }
    },[token])

    //console.log(users)

    return{
        users : [users,SetUserS]
    }
}
export default UserSAPI
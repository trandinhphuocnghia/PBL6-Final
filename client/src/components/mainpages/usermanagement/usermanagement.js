import React, { useContext, useEffect } from "react";
import axios from 'axios';
import { GlobalState } from "../../../GlobalState";

function UserManagement() {
    const state = useContext(GlobalState)
    const [users,setUserS] = state.userSAPI.users
    
   // console.log(users[0])
    return(
       <>
       {
          
       }
       </>
    )
}

export default UserManagement
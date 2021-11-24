
  
import React from "react";


//create message 

//Error message
export const ShowErrMsg = (msg) => {
    return (
        <div className = "errMsg">
            {msg}
        </div>
    )
}

//Susscess message
export const ShowSuccessMsg = (msg) => {

    return (
        <div className="successMsg">
            {msg}
        </div>
    )
}
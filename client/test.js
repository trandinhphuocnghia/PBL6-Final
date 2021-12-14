import React, {useContext, useEffect, useState} from 'react'
import { GlobalState } from '../../../Globalstate'
import axios from 'axios'
function Home(){
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [emails,setEmails] = useState([])
    const [isadd,setIsadd] = useState(false)
    const [daily,setDaily] = useState(false)
    useEffect(() =>{
      const getEmails = async ()=> {
      const res = await axios.get('http://localhost:9001/getallmail')
      setEmails(res.data)}
      getEmails()
    },[])
    
    

    //add emails
    const Addemails = () =>{

    }
    return(
        <>
       {
       isAdmin ? 
    <div className="inputemail">
    <input className="input" type="email" placeholder="Email Address" id="inputemail" />
    </div>
        : ''
       }
  <table className="styled-table">
    <thead>
      <tr>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="emails">
      {
       emails.map( email => (
        <tr> 
          <td>{email.Email}</td>
        </tr>
       ))
     
      }
    </tbody>
  </table>
  {
      isAdmin ?
  <form id="formsubmit" method="post">
	 <input className="submitbtn btn2" type="submit" id="btnsubmit" value="Send Mail" />
  </form>
    : ''
    }
        </>
    )
}
export default Home
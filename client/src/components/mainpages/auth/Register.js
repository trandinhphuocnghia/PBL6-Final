import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { isEmpty, isMatch } from '../utils/check/check'
import { ShowErrMsg, ShowSuccessMsg } from '../utils/notification/notification'

////initial state
const initialState = {
    name : '',
    email:'',
    password: '',
    repassword: '',
    err: '',
    success : '',
}

function Register() {
    const [user, setUser] = useState({initialState})
    const {name,email,password,repassword,err,success} = user;
    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value,err:'',success:''})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        if(isEmpty(name)||isEmpty(password)) return setUser({...user,err: "Please fill in all fields",success : ""})
        if(!isMatch(password,repassword)) return setUser({...user,err:'Password did not match.',success:''})
        try {
          const res = await axios.post('/user/register', {name,email,password})
            //if success
            setUser({...user,err:'',success:res.data.msg})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/";
        } catch (err) {
            err.response.data.msg && setUser({...user,err:err.response.data.msg,success:''})
        }
    }

    return (
        <div className="register">
        <div className="login-page reheight position">
            <form className="resizeform" onSubmit={registerSubmit}>
            
                <h2>Register</h2>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />
                
                 <input type="password" name="repassword" required autoComplete="on"
                placeholder="Password Again" value={user.repassword} onChange={onChangeInput} />
                
                <div className="row">
                    <button type="submit">Register</button>
                   <div className="qs"><p>You have an account?</p><Link to="/login">Login now</Link></div>
                    
                </div>
            </form>
        </div>
        </div>
    )
}

export default Register
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { ShowErrMsg, ShowSuccessMsg } from '../utils/notification/notification'


////initial state
const initialState = {
    email:'',
    password: '',
    err: '',
    success : '',
}
function Login() {
    const [user, setUser] = useState({initialState})
    const {email,password,err,success} = user;    

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value,err:'',success:''})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
          const res = await axios.post('/user/login', {...user})
          setUser({...user,err:'',success:res.data.msg})
            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/product";
        } catch (err) {
            err.response.data.msg && setUser({...user,err:err.response.data.msg,success:''})
        }
    }

    return (
        <div className="Login">
        <div className="login-page position">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">SignUp</Link>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login

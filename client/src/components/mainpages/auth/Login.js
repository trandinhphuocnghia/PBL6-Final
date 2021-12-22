import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { ShowErrMsg, ShowSuccessMsg } from '../utils/notification/notification'
import lego1 from '../../../img/legoweb.jpg'
import lego2 from '../../../img/lego02.png'
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
        <div className="shape">
            <img src={lego2}/>
        </div>
        <div className="shape2">
            <img src={lego1}/>
        </div>
        <div className="login-page position">
            <form className="fade" onSubmit={loginSubmit}>
                <h2>Login</h2>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                <input className="finp" type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input className="finp" type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <div className="qs"><p>Dont have any account?</p><Link to="/register">Register now</Link></div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login

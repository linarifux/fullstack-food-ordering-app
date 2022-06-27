import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {registerUser} from '../actions/userActions'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Success from '../components/Success'

const Registration = () => {

    const dispatch = useDispatch()

    const initialState = {
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: '',
        userType: ''
    }
    const [user, setUser] = useState(initialState)

    const registerState = useSelector(state => state.registerUserReducer)

    const {error, loading, success} = registerState
    const { name, email, password, password2, userType, phone } = user

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!userType){
            return alert("Fill All the Fields")
        }
        if(password !== password2){
            return alert("password didn't match")
        }
        dispatch(registerUser({name,email,password, userType, phone}))
        setUser(initialState)
    }

    return (
        <div className='container' style={{marginBottom: '220px'}}>
            <div className="row justify-content-center">
                <div className="col-md-5 mt-5 shadow p-3 mb-5 bg-white rounded">
                    {loading && <Loading />}
                    {success && <Success />}
                    {error && <Error message={'Invalid Information!'} type={'danger'} />}
                    <h2 className='text-center'>Create an Account</h2>
                    <div>
                        <input type="text" placeholder='Name' className='form-control' value={name} name='name' onChange={(e) => handleOnChange(e)} />
                        <input type="email" placeholder='Email' className='form-control' value={email} name='email' onChange={(e) => handleOnChange(e)} />
                        <input type="text" placeholder='Phone' className='form-control' value={phone} name='phone' onChange={(e) => handleOnChange(e)} />
                        <label htmlFor="userType">I am going to - </label>
                        <select className='form-control' name="userType" id="userType" onChange={(e) => handleOnChange(e)} >
                            <option value="user">Order Food</option>
                            <option value="restaurant">Sell Food</option>
                            <option value="deliveryMan">Deliver Food</option>
                        </select>
                        <input type="password" placeholder='Password' className='form-control' value={password} name='password' onChange={(e) => handleOnChange(e)} />
                        <input type="password" placeholder='Re-type Password' className='form-control' value={password2} name='password2' onChange={(e) => handleOnChange(e)} />
                        <div className='d-flex mt-4 align-items-center justify-content-between'>
                            <button className="btn" name='reg' onClick={(e) => handleSubmit(e)}>REGISTER</button>
                            <a >Already Have an Account? <Link to={'/login'} style={{color: 'inherit'}}><span>Login</span></Link></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { loginUser } from '../actions/userActions'
import Error from '../components/Error'
import Loading from '../components/Loading'

const Login = () => {

  const {loading, error} = useSelector(state => state.loginUserReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('currentUser')){
      navigate('/')
    }
  }, [navigate])

  const initialState = {
    email: '',
    password: ''
  }
  const [user, setUser] = useState(initialState)
  const { email, password } = user

  const handleOnChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(user))
    setUser(initialState)
    if(!localStorage.getItem('currentUser')){
      return navigate('/login')
    }
    navigate('/')

  }
  

  
  return (
    <div className='container' style={{marginBottom: '400px'}}>
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5 shadow p-3 mb-5 bg-white rounded">
          {loading && <Loading />}
          {error && <Error message={'Invalid Credentials'} type={'danger'} />}
          <h2 className='text-center'>Login to Your Account</h2>
          <div>
            <input type="email" placeholder='Email' className='form-control' value={email} name='email' onChange={(e) => handleOnChange(e)} />
            <input type="password" placeholder='Password' className='form-control' value={password} name='password' onChange={(e) => handleOnChange(e)} />
            <div className='d-flex justify-content-between align-items-center  mt-3'>
              <button className="btn" name='reg' onClick={(e) => handleSubmit(e)}>LOGIN</button>
                <a >New Here? <Link to={'/registration'} style={{color: 'inherit', textDecoration: 'none'}}><span style={{textDecoration: 'underline'}}>Register</span></Link>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
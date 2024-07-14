import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function LogIn(){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending login request with email:', email);
        console.log('Password length:', password ? password.length : 0);

        axios.post("http://localhost:3001/login", { email, password })
        .then(result => {
            console.log('Server response:', result.data)
            if(result.data.message === "Success"){
              localStorage.setItem('token', result.data.token)
              navigate("/medication-reminder")
            }else{
                navigate("/log-in")
                alert("You are not registered to this service")
            }       
        })
        .catch(err => {
          console.error('Login error:', err.response ? err.response.data : err.message);
          alert("An error occurred. Please check the console and try again.");
        })
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-4 rounded" style={{ minWidth: '300px', maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input 
              type="text" 
              placeholder='Enter Email' 
              autoComplete='off' 
              name='email' 
              className='form-control rounded-0' 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input 
              type="password" 
              placeholder='Enter Password' 
              name='password' 
              className='form-control rounded-0' 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p className="mt-3">Don't have an account?</p>
        <Link to="/log-in/sign-up" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Sign Up
        </Link>
      </div>
    </div>
    )
}

export default LogIn;

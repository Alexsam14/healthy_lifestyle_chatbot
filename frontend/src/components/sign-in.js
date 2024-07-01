import React from 'react';
import { Link } from 'react-router-dom';

function SignIn(){
    return (
        <div className='wrapper'>
        <form className='sign-in'>
        <h1>Log In</h1>
        <div className='input-box'>
            <input type="text" placeholder='Username' required></input>
        </div>
        <div className='input-box'>
            <input type="password" placeholder="Password" required></input>
        </div>
        
        <button type='submit'>Login</button>

        <br></br>
        <br></br>
        
        <div className='register-link'>
            <p>Don't have an account? <Link to="/sign-in/register">Register</Link></p>
        </div>
        </form>
        </div>
    )
}

export default SignIn;

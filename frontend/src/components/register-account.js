import React from 'react';

function Register(){
    return(
        <div className='wrapper'>
        <form className='sign-in'>
        <h1>Sign Up</h1>
        <div className='input-box'>
            <input type="text" placeholder='Username' required></input>
        </div>
        <div className='input-box'>
            <input type="password" placeholder="Password" required></input>
        </div>
        <div className='input-box'>
            <input type="tel" placeholder="+233xxxxxxxxx" required></input>
        </div>

        <div className='remember'>
            <label>
                <input type='checkbox'></input> I agree to the terms & conditions
            </label>
        </div>
        
        <button type='submit'>Login</button>

        <br></br>
        <br></br>
        </form>
        </div>
    )
}

export default Register;
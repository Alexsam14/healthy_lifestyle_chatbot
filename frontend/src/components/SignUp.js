import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../Header'; // Make sure this path is correct
import "bootstrap/dist/css/bootstrap.css";
import "../Header.scss"; // Make sure this path is correct

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!name || name.trim() === '') {
            setError('Name is required');
            return;
        }
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
        if (!password.trim()) {
            setError('Password is required');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        axios.post("http://localhost:3001/register", {
            name: name,
            email: email,
            password: password
        })
        .then(result => {
            console.log("Signup successful: ", result.data);
            navigate("/");
        })
        .catch(err => {
            console.error('Signup error:', err);
            if (err.response) {
                console.error('Error data:', err.response.data);
                console.error('Error status:', err.response.status);
                console.error('Error headers:', err.response.headers);
                setError(err.response.data.message || 'An error occurred during signup');
            } else if (err.request) {
                console.error('Error request:', err.request);
                setError('No response received from server');
            } else {
                console.error('Error message:', err.message);
                setError('An error occurred during signup');
            }
        });
    }

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Header showLogout={false} />
            <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
                <div className="bg-white p-4 rounded" style={{ minWidth: '300px', maxWidth: '400px', width: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                    <h2 className="text-center">Sign Up</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder='Enter Name'
                                autoComplete='off'
                                name='name'
                                className='form-control rounded-0'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
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
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-3">Already have an account?</p>
                    <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
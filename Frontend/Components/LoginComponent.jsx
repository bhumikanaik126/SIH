import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/index.css';

export function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password }),
            })
            

            const data = await response.json();

            if (response.ok) {
                if (data.redirectUrl) {
                    navigate(data.redirectUrl);
                } else {
                    setMessage('Login successful, but no redirect URL provided.');
                }
            } else {
                setMessage(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }

    };

    return (
        <div className="form-container">
            <p className='input-field'>Login Page</p>
            <div>
                <p>Email</p>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className='border rounded-md shadow-md w-full p-2'
                />
            </div>
            <div className='input-field'>
                <p>Password</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className='border rounded-md shadow-md w-full p-2'
                />
            </div>
            <button
                onClick={handleSubmit}
                className='bg-blue-600 px-4 py-2 rounded-md shadow-md text-white w-full'
            >
                Login
            </button>
            {message && <p className='text-center text-red-600'>{message}</p>}
            <div className='text-center mt-4'>
                <span>Don't have an account? </span>
                <span
                    onClick={() => navigate("/users/signup")}
                    className='text-blue-600 cursor-pointer'
                >
                    Sign up here
                </span>
            </div>
        </div>
    );
}

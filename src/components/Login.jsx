import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserId(data.id);
          navigate('/games');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='login-page'>
      <h1 className='app-title'>Soccer Pick-Up App</h1>
      <div className='login-container'>
        <h2 className='login-title'>Login to Soccer App</h2>
        <form className='login-form' onSubmit={handleLogin}>
          <div className='form-group'>
            <label className='form-label' htmlFor='username'>
              Username
            </label>
            <input
              className='form-input'
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='password'>
              Password
            </label>
            <input
              className='form-input'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='login-button' type='submit'>
            Login
          </button>
        </form>
        <p className='signup-prompt'>
          Don't have an account?
          <button className='signup-button' onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

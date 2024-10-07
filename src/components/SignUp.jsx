import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Sign up successful! You can log in now.');
          navigate('/login'); // Redirect to the login page after successful signup
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className='sign-up-form'>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

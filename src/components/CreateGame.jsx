import React, { useState } from 'react';

const CreateGame = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [gameStatus, setGameStatus] = useState('scheduled'); // default to 'scheduled'
  const [fieldName, setFieldName] = useState(''); // new state for field_name
  const [city, setCity] = useState(''); // new state for city

  const handleSubmit = (e) => {
    e.preventDefault();

    const gameData = {
      date,
      time,
      game_status: gameStatus,
      field_name: fieldName, // include field_name in the request
      city, // include city in the request
    };

    fetch('http://localhost:3000/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Game created successfully!');
        } else {
          alert('Failed to create game.');
        }
      })
      .catch((err) => console.log('CreateGame error:', err));
  };

  return (
    <div className='create-game-form'>
      <h1>Create New Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Game Status:</label>
          <select
            value={gameStatus}
            onChange={(e) => setGameStatus(e.target.value)}
            required
          >
            <option value='scheduled'>Scheduled</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <div>
          <label>Field Name:</label>
          <input
            type='text'
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Create Game</button>
      </form>
    </div>
  );
};

export default CreateGame;

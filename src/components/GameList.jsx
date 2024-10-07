import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games from API
    fetch('http://localhost:3000/api/')
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='game-list'>
      <Link to='/create-game'>
        <button className='create-game-button'>Create a New Game</button>
      </Link>
      <h1 className='title'>Available Games</h1>
      <div className='games-container'>
        {games.map((game) => (
          <Link
            to={`/game/${game.game_id}`}
            key={game.game_id}
            className='game-card'
          >
            <h3 className='game-title'>{game.field_name}</h3>
            <p className='game-details'>Location: {game.city}</p>
            <p className='game-details'>Time: {game.time}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameList;

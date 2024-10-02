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
    <div>
      <h1>Available Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.game_id}>
            <Link to={`/game/${game.game_id}`}>
              {game.field_name} in {game.city} at {game.time}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;

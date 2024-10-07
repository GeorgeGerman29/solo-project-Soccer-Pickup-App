import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayersList from './PlayersList';
import CreateGame from './CreateGame';
const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  console.log('Game ID from URL:', id);

  useEffect(() => {
    // Fetch game details from API based on game ID
    fetch(`http://localhost:3000/api/game?id=${id}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className='game-details-container'>
      <h1>{game.field_name}</h1>
      <p>Time: {game.time}</p>
      <p>Address: {game.address}</p>
      <p>City: {game.city}</p>

      <div className='players-list'>
        
        <PlayersList players={game.full_name} />
      </div>
    </div>
  );
};

export default GameDetails;

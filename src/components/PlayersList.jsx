import React from 'react';

const PlayersList = ({ players }) => {
  return (
    <div className='players-list'>
      <h2>Players List</h2>
      <ul>
        {players}
      </ul>
    </div>
  );
};

export default PlayersList;

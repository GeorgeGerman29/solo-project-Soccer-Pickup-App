import React from 'react';
import{ useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import GameList from './components/GameList';
import CreateGame from './components/CreateGame'
import GameDetails from './components/GameDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';
// import CreateGame from './CreateGame';


const App = props => {
  const [userId, setUserId] = useState(null);
   console.log('Current User ID:', userId);
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={userId ? <Navigate to='/games' /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={<Login setUserId={setUserId} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/game/:id' element={<GameDetails />} />
        <Route path='/create-game' element={<CreateGame />} />
        {/* Create new game */}
        <Route path='/games' element={<GameList />} />
        {/* Home page */}
      </Routes>
    </Router>
  );
};

export default App;

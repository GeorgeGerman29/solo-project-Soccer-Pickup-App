import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameList from './components/GameList';
// import GameDetails from './GameDetails';
// import CreateGame from './CreateGame';


const App = props => {
  return (
    <Router>
      <Routes>
        {/* <Route path='/login' component={Login} />  */}
        {/* <Route path='/game/:id' element={<GameDetails/>} />  */}
        {/* <Route path='/create-game' component={CreateGame} />  */}
        {/* Create new game */}
        {/* Generic path last */}
        <Route path='/' element={<GameList/>} />
        {/* Home page */}
      </Routes>
    </Router>
  );
};

export default App;

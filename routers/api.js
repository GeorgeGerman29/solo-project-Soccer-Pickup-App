const express = require('express');
const soccerController = require('../controllers/soccerController.js');
const router = express.Router();

// Route to get all players
// router.get('/players', soccerController.getAllPlayers, (req, res) => {
//   res.status(200).json(res.locals.players); // Send the list of players as a JSON response
// });
router.get('/', soccerController.getAllGames, (req, res) => {
  res.status(200).json(res.locals.games);
})
router.get('/game', soccerController.getGameId, (req, res) => {
  res.status(200).json(res.locals.gameId);
})

module.exports = router;

const express = require('express');
const soccerController = require('../controllers/soccerController.js');
const router = express.Router();
const userController = require('../controllers/userController.js');

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
router.post('/create', soccerController.createGame, (req, res) => {
  res.status(200).json(res.locals.createGame)
})
router.post('/join', soccerController.joinGame, (req, res) => {
  res.status(200).json(res.locals.join)
})
router.get('/players', soccerController.getPlayers, (req, res) => {
  res.status(200).json(res.locals.players)
})
router.post('/login', userController.login, (req, res) => {
  res.status(200).json({ success: true, user: res.locals.user });
})
module.exports = router;

const db = require('../models/soccerModels.js'); // Import the database connection
const soccerController = {};

// Get all players from the 'players' table
soccerController.getAllPlayers = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM Users');
    console.log(result.rows); // Log the rows in the console

    // Optionally, you can attach the result to res.locals for later use
    res.locals.players = result.rows;

    // Call next() to pass control to the next middleware (if in an Express app)
    return next();
  } catch (err) {
    console.error('Error executing query:', err);
    // Optionally, set an error object in res.locals and pass to error handling middleware
    return next(err);
  }
};
soccerController.getAllGames = async (req, res, next) => {
  try {
      const id = req.query.id;
      console.log('id:',id)
    const result = await db.query(`SELECT users.full_name, games.game_id, games.date, games.time, games.game_status, fields.address, fields.city, fields.state, fields.zip_code, 
        fields.field_name, fields.field_type FROM games 
        JOIN users ON games.created_by = users.user_id 
        JOIN fields ON games.location_id = fields.field_id
        WHERE games.game_status = 'scheduled'
        `);
    console.log(result.rows);
    res.locals.games = result.rows;
    return next();
  } catch (err) {
    console.error('Error executing query:', err);
    // Optionally, set an error object in res.locals and pass to error handling middleware
    return next(err);
  }
};
soccerController.getGameId = async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log('id:', id);
    const string = (`SELECT users.full_name, games.game_id, games.date, games.time, games.game_status, fields.address, fields.city, fields.state, fields.zip_code, 
        fields.field_name, fields.field_type FROM games 
        JOIN users ON games.created_by = users.user_id 
        JOIN fields ON games.location_id = fields.field_id
        WHERE games.game_id = $1;
        `);
      const result = await db.query(string, [id]);
      console.log('result:',result.rows[0])
      res.locals.gameId = result.rows[0];
    return next();
  } catch (err) {
    console.error('Error executing query:', err);
    // Optionally, set an error object in res.locals and pass to error handling middleware
    return next(err);
  }
};
// Export the controller for use in other parts of your app
module.exports = soccerController;

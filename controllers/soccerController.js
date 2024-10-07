
const db = require('../models/soccerModels.js'); // Import the database connection
const soccerController = {};

soccerController.getAllGames = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT 
        games.game_id, 
        games.time, 
        fields.field_name, 
        fields.city 
      FROM 
        games 
      JOIN 
        fields ON games.location_id = fields.field_id 
      WHERE 
        games.game_status = 'scheduled';
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
    const string = `SELECT users.full_name, games.game_id, games.date, games.time, games.game_status, fields.address, fields.city, fields.state, fields.zip_code, 
        fields.field_name, fields.field_type FROM games 
        JOIN users ON games.created_by = users.user_id 
        JOIN fields ON games.location_id = fields.field_id
        WHERE games.game_id = $1;
        `;
    const result = await db.query(string, [id]);
    console.log('result:', result.rows[0]);
    res.locals.gameId = result.rows[0];
    return next();
  } catch (err) {
    console.error('Error executing query:', err);
    // Optionally, set an error object in res.locals and pass to error handling middleware
    return next(err);
  }
};

soccerController.createGame = async (req, res, next) => {
  try {
    const { date, time, game_status, field_name, city } = req.body;

    // Check if field exists
    const fieldQuery =
      'SELECT field_id FROM fields WHERE field_name = $1 AND city = $2;';
    const fieldResult = await db.query(fieldQuery, [field_name, city]);

    let fieldId;
    if (fieldResult.rows.length > 0) {
      // Field exists, get field_id
      fieldId = fieldResult.rows[0].field_id;
    } else {
      // Field does not exist, insert new field and get field_id
      const insertFieldQuery =
        'INSERT INTO fields (field_name, city) VALUES ($1, $2) RETURNING field_id;';
      const insertFieldResult = await db.query(insertFieldQuery, [
        field_name,
        city,
      ]);
      fieldId = insertFieldResult.rows[0].field_id;
    }

    // Insert new game with the field_id
    const insertGameQuery = `INSERT INTO games (date, time, location_id, game_status)
                             VALUES ($1, $2, $3, $4) RETURNING *;`;
    const gameResult = await db.query(insertGameQuery, [
      date,
      time,
      fieldId,
      game_status,
    ]);

    res.locals.createdGame = gameResult.rows[0];
    console.log('Inserted Game:', res.locals.createdGame);

    return next();
  } catch (err) {
    console.error('Error executing query:', err);
    return next(err);
  }
};
soccerController.joinGame = async (req, res, next) => {
  try {
    const string =
      'Insert INTO users (full_name,username,email) VALUES ($1,$2,$3) RETURNING *;';
    const { full_name, username, email } = req.body;
    const result = await db.query(string, [full_name, username, email]);
    res.locals.join = result.rows[0];
    console.log('joined game', res.locals.join);
    return next();
  } catch (err) {
    console.error('Error executing query:', err);
    // Optionally, set an error object in res.locals and pass to error handling middleware
    return next(err);
  }
};
soccerController.getPlayers = async (req, res, next) => {
  const { gameId } = req.query;
  try {
    const query = `
      SELECT 
        players.player_id,
        users.full_name
      FROM 
        players
      JOIN 
        teams ON players.team_id = teams.team_id
      JOIN 
        games ON teams.game_id = games.game_id
      JOIN 
        users ON players.user_id = users.user_id
      WHERE 
        games.game_id = $1;
    `;

    const result = await db.query(query, [gameId]);
    res.locals.players = result.rows[0];
    return next();
    // Return players as JSON
  } catch (err) {
    console.error('Error executing query:', err);
    // Optionally, set an error object in res.locals and pass to error handling middleware
    return next(err);
  }
};

// Export the controller for use in other parts of your app
module.exports = soccerController;

const db = require('../models/soccerModels');

const userController = {};

userController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Query the database to find the user by username
    const query = `SELECT * FROM users WHERE username = $1;`;
    const result = await db.query(query, [username]);
 if (result.rows.length === 0) {
   return res.status(401).json({ success: false, message: 'User not found' });
 }

      const user = result.rows[0];
      console.log('user',user)
   
    // Compare the provided password with the stored password (plaintext comparison here)
    if (password === user.password) {
      // If passwords match, send success response with user info (or token)
         res.locals.user = {
           id: user.user_id,
           username: user.username,
         };
      return next()
    } else {
      // If passwords don't match, send an unauthorized response
      return next(err)
    }
  } catch (err) {
    console.error('Error executing query:', err);
    return next(err);
  }
};

module.exports = userController;
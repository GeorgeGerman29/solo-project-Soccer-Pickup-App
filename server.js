const path = require('path');
const express = require('express');

const app = express();
const cors = require('cors');
const apiRouter = require('./routers/api.js');
// const usersRouter = require('./routers/users.js')
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, './dist')));
// app.get('/login', (req, res) => {
  
// })

app.use('/api', apiRouter);
// app.get('*', (req, res) => {
//   console.log(`Received request for: ${req.url}`);
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
app.use('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('why its getting error:', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

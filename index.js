const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(session({
  secret: 'matching-game-secret',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
  res.render('game');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
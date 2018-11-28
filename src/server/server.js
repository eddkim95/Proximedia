const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// connect to SQL database
const pgp = require('pg-promise');
const url = require('../private/dbURL');

const db = pgp(url);

// use statements
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));

// cors functionality
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Kubernetes is the way of life');
});

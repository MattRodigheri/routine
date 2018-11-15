const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/')

app.use(express.static(__dirname + './../client/dist'));
app.use(express.json());

app.get('/routine', function (req, res) {
  db.getRoutine((err, data) => {
    if (err) {
      res.status(503).send(err);
    } else {
      res.send(data);
    }
  });
});


app.listen(3000, () => console.log('listening on port 3000!'));

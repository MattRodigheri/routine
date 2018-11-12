const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + './../client/dist'));
app.use(express.json());


app.listen(3000, () => console.log('listening on port 3000!'));

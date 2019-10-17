const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./database");
const router = express.Router();

// app.use(express.static(__dirname + "./../client/dist"));
app.use(express.json());

app.get("/routine", (req, res) => {
  db.getRoutine(req.headers.day, (err, data) => {
    if (err) {
      res.status(503).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/routine", req => {
  db.addExercise(req.body);
});

app.delete("/routine", req => {
  db.removeExercise(req.body);
});

app.use("/api", router);

app.listen(3001, () => console.log("listening on port 3001!"));

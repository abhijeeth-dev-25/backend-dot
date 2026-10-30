const express = require("express");
const notesRoute = require("./routes/notes.router");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/notes", notesRoute)

module.exports = app;
const express = require("express");
const notesRoute = require("./routes/notes.router");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}))

app.get("/", (req, res) => {
  res.send("hello");
});
  
app.use("/notes", notesRoute)

module.exports = app;
const express = require('express');
const fileRoutes = require('./routes/file.router')

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.send("Hello world");
})

app.use('/files', fileRoutes )


module.exports = app;
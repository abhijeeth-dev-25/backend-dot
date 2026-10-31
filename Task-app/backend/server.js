const app = require("./src/app");
const connectDB = require("./src/config/db");
const dotenv = require('dotenv');

dotenv.config();




connectDB();



app.listen(process.env.port, ()=>{
    console.log(`server running on port ${process.env.port}`);
})
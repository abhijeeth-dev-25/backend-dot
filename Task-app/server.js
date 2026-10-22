const app = require("./src/app");
const connectDB = require("./src/config/db");
const dotenv = require('dotenv');

dotenv.config();




connectDB();



app.listen(3232, ()=>{
    console.log("server running on port 3232");
})
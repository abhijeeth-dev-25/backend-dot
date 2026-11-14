import express from "express"
import authRouter from "../routes/auth.routes.js"
import cookieparser from "cookie-parser"

const app = express();

app.use(express.json())
app.use(cookieparser());


app.get("/", (req, res)=>{
    res.send("hello world");
})

app.use('/user', authRouter );


export default app;
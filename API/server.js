import express from 'express'
import bodyParser from 'body-parser'
import db from '../db.js'
import passport from '../auth.js'
import Menurouter from "../Router/MenuRouter.js";
import Personrouter from "../Router/personRouter.js";
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(db,()=>{
    console.log("db is trying to connect")
})

app.get("/",(req,res,next)=>{
        res.send("Welcome to the hotel _SHEFALI_SINGH_HOTEL");
})

app.use(passport.initialize());
const isLoggedIn = passport.authenticate('local',{session: false})

app.get('/',(req,res,next)=>{
    res.send("Welcome to our hotel")
})

app.use("/menu",isLoggedIn, Menurouter);
app.use("/user", Personrouter);

app.listen(3000,()=>{
    console.log("Your server has started and you are at port 3000!")
})
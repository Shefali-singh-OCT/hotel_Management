import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

// mongoose.connect(process.env.MONGOOSE_PORT)

const db = mongoose.connection
db.on("connected",()=>{
    console.log("Your mongoose is been connected")
})

db.on("error",(err)=>{
    console.log("An error occured in connected to mongoose:", err)
})

db.on("disconnected",()=>{
    console.log("You have been disconnected from mongoose")
})

export default db
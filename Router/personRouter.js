import express from 'express'
const Personrouter = express.Router()
import person from '../Models/personModel.js'
// import { jwtWebAuthentication, generateToken } from '../jwt.js'

Personrouter.get('/',async (req,res)=>{
    try{
      const data = await person.find()
      console.log("data fetched successfully")
      res.status(200).json(data)
    }
    catch(error){
        console.log("error Occured")
        res.status(500).json({error: "Internal Server error"})
    }
})

Personrouter.get("/profile",(req,res)=>{
    try{
        const userid = req.user.id
        const data = person.findById(userid)
        console.log("data is been found")
        res.status(200).json(data)
    }
    catch(error){
        console.log("error occured")
        return res.status(500).json({error: "Internal server error"})
    }
})

// Personrouter.get('/profile',(req,res,next)=>{
//     try{
        
//     }
//     catch(error){
//         console.log("Error occured")
//         res.status(500).json({error: 'Internal server error'})
//     }
// })

Personrouter.get('/login',async (req,res,next)=>{
    try{
     const {username,password} = req.body
     const data = await person.findOne({userName: username})
     if(!data || ! await data.comparePassword(password)){
        res.status(404).json({error: "invalid username of password"})  
     } 
     const payload = {
        id: data.id,
        email: data.email
     }
     const token = generateToken(payload)
     console.log("logged in successfully")
     res.status(200).json({token})
    }
    catch(error){
        console.log("Error encountered")
        res.status(500).json({error: "Internal server error"})
    }
})

// Personrouter.get("/search/:workType",async)

Personrouter.put("/update/:id", async (req,res,next)=>{
    try{
        const menuid = req.params.id
        const person = req.body
        const data = await person.findByIdAndUpdate(menuid,person,{
        new: true,
        runValidator: true
       })
       if(!response){
        res.status(404).json({error: "id not correct"})
       }
    console.log("data fetched successfully")
    req.status(200).json(response)
    }
    catch(error){
        console.log("error occured")
        res.status(500).json({error: 'Internal Server error'})
    }
})

Personrouter.delete("/delete/:id",async (req,res,next)=>{
    try{
       const userid = req.params.id
       const response = await person.findByIdAndDelete(userid)

      console.log("data deleted successfully")
      res.status(200).json(response) 

    }
    catch(error){
        console.log("Error occured")
        res.status(500).json({error: "Internal Server Error"})
    }
})

export default Personrouter
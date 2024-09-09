import express from 'express'
const Menurouter = express.Router()
import Menu from '../Models/menuModel.js'

Menurouter.post('/createNew',async (req,res,next)=>{
    try{
    const menu = req.body
    const Addmenu = new Menu(menu)
    const response = await Addmenu.save()
    console.log("data saved")
    res.status(200).json(response)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})

Menurouter.get("/",async (req,res,next)=>{
    try{
    const data = await Menu.find();
    console.log("data fetched Successfully")
    res.status(200).json(data)
    }catch(error){
        req.status(500).json({error: "Internal Server Error"})
    }
})
  
Menurouter.get("/search:taste",async (req,res,next)=>{
    try{
    const tast = req.params.taste
    if(tast=='sweet' || tast=='sour' || tast=='bitter' || tast=='spicy' || tast=='salty'){
         const data = await Menu.find({taste: tast});
         console.log("Data fetched")
         res.status(200).json(data)
    }else{
       console.log("Invalid taste type")
       res.status(404).json({error: "Invalid taste type"})
    }
}catch(error){
       res.status(500).json({error: "Internel Server Error"})
}
})

Menurouter.put("/update/:id",async (req,res,next)=>{
    try{
        const menuid = req.params.id
        const updatedData = req.body
        const response = await Menu.findOneAndUpdate({_id: menuid},{updatedData},{
            new:true,
            runValidators: true
        })
        if(!response){
            res.status(404).json({error: "Menu Item Not Found"})
        } 
        console.log("Data updated")
        res.status(200).json(response)
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error"})
    }
})

Menurouter.delete('/delete/:id',async (req,res)=>{
    try{
    const menuid = req.params.id
    const response = await Menu.findByIdAndDelete(menuid)
    if(!response) 
        res.status(404).json({error : "Menu item not found"})
    console.log("Menu deleted successfully")
    res.status(200).json({message: "Menu is been deleted"})
}catch(error){
    console.log("error occured")
    res.status(500).json({error: "Internal server error"})
}
})

export default Menurouter
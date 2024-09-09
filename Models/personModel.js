import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const PersonSchema = new mongoose.Schema({
    userName: {
        type:String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
     type: String,
     unique: true,
     required: true
    },
    position: {
     type: String,
     enum: ['Chef','waiter','manager','owner']
    },
    address: {
        type: String
    }
})

    PersonSchema.pre('save',async (next)=>{
        const person = this
        if(!person.isModified('password')) return next();
        try{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(person.password,salt)
            person.password = hashedPassword
            next()
        }catch(error){
            return next(error)
        }
    })

 PersonSchema.methods.comparePassword = async function(candiatePassword){
    try{
       const isMatch = await bcrypt.compare(candiatePassword,this.password)
       return isMatch
    }
    catch(err){
        throw err
    }
 }

const person = mongoose.model('person',PersonSchema)
export default person
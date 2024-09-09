import mongoose from 'mongoose'

const MenuSchema = new mongoose.Schema({
    dishName: {
        type:String,
        required: true
    },
    price: {
      type: Number,
      required: true
    },
    is_Drinkable: {
        type: Boolean,
        required: true
    },
    ingredients:{
        type: [String]
    },
    num_sales: {
        type: Number,
        required: true
    },
    taste: {
        type:String,
        enum: ['sweet','sour','spicy','bitter','salty']
    },
    recipe: {
        type:[String],
        default: []
    }
})



const Menu = mongoose.model("menu",MenuSchema)
export default Menu
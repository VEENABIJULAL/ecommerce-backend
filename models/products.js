const mongoose =require("mongoose") //import mongoose

//connection string
mongoose.connect('mongodb://localhost:27017/deepnetsoft',{
useNewUrlParser:true,
useUnifiedTopology:true,
})

//model

const Product=mongoose.model('Product',{
    Name:{
        type: String,
        index: true
    },
    Price:{
        type: Number,
        index: true
    },
    Quantity:{
        type: Number,
        index: true
    },
    Category:{
        type: String,
        index: true
    }
    
})

//export
module.exports={

Product
}
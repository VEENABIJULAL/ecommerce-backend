const mongoose =require("mongoose") //import mongoose

//connection string
mongoose.connect('mongodb://localhost:27017/deepnetsoft',{
useNewUrlParser:true,
useUnifiedTopology:true,
})

//model
const User=mongoose.model('User',{
    
    username:String,
    password:String
    
})


//export
module.exports={
User
}
const db=require('./db');
const products = require('../models/products');
let currentUser=""
const register=(username,password)=>{
 
  return db.User.findOne({username})
  .then(user=>{
    if(user){
      return{
        statusCode:422,
        status:false,
        message:"user exit"
      }
    }
    else{
      const newUser=new db.User({
        username,
        password
        
      })
      console.log(newUser);
      newUser.save();
      return{
        statusCode:200,
        status:true,
        message:"successfully registered"
      }
    }
  })
}
const login=(req,username,password)=>{
    
    
    return db.User.findOne({username,password})
   .then(user=>
     {
       if(user){
         req.session.currentUser=username
         return{
           statusCode:200,
           status:true,
           name:user.username,
           message:"Successfully login"
       } 
       }
       else{
     
         return {
           statusCode:422,
           status:false,
          message:"invalid accont number"
         }
       }
     })
   }
   const add=(req,name,price,qty,category)=>{
    let Name=name;
 return products.Product.findOne({Name})
 .then(result=>{
   if(result){
     return {
       statusCode:422,
       status:false,
      message:"product exit..."
   }
   }
   else{
     const newProduct=new products.Product({
         Name:name,
         Price:price,
         Quantity:qty,
         Category:category
       
     })
     console.log(newProduct)
     newProduct.save()
     return{
       statusCode:200,
         status:true,
         message:"Product Added Successfully"
     }
   }
 })
}
const displayProducts=()=>{
   
  return products.Product.find({})
  .then(result=>{
    if(!result){
      return {
        statusCode:400,
        status:true,
       message:"no products..."
    }
    }
    else{
      return{
        statusCode:200,
          status:true,
          message:result
      }
    }
  })
 }  

 const search=(req,res,next)=>{
   let Name=req.body.search
   console.log(Name);
  return products.Product.findOne({Name})
  .then(user=>{
    
    if(!user){
      return{
        statuscode:422,
        status:false,
        message:"error...."
       }
    }
      else{
        console.log(user["Price"]);
        return{
          statuscode:200,
          status:true,
          message:(user["Price"]) 
        }   
      }
  })
 }

   module.exports={
     register,
       login,
       add,
       displayProducts,
       search
       
       
   }
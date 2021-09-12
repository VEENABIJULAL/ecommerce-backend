const express=require('express'); //import express
const app=express();
const dataservice=require('./sevices/dataservices'); // import data.service
const cors=require('cors'); //import cors
app.use(cors({
  origin:'http://localhost:4200', //client path 
  credentials:true  //to use cookies
}))

const session=require('express-session');//import session
app.use(session({
  secret:'randomsecurestring',
  resave:false,
  saveUninitialzed:false
}));
app.use(express.json());
const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
      return res.json({
        statusCode:401,
        status:false,
        message:"please login"
      })
    }
    else{
      next();
    }
  }
  app.listen(3000,()=>{
    console.log("server started at port :3000");
})
app.post('/register',(req,res)=>{
  dataservice.register(req.body.username,req.body.password)
.then(result=>{
res.status(result.statusCode).json(result)
})
});
app.post('/login',(req,res)=>{
    //console.log(req.body);
    dataservice.login(req,req.body.name,req.body.pswd)
    .then(result=>{
      res.status(result.statusCode).json(result); 
    })
       
    });
    app.post('/add',(req,res)=>{
        console.log(req.body);
        
        dataservice.add(req,req.body.name,req.body.price,req.body.qty)
        .then(result=>{
          res.status(result.statusCode).json(result); 
        })
           
        });
        app.post('/displayProducts',(req,res)=>{
          dataservice.displayProducts(req)
           .then(result=>{
             res.status(result.statusCode).json(result); 
           })
              
           });
           app.get('/search',(req,res)=>{
            console.log(req.body);
            dataservice.search(req,req.body.search)
            .then(result=>{
              res.status(result.statusCode).json(result); 
            })
               
            });
    
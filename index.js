

//import express and store in a variable

const { response } = require("express")
const express=require("express")

//import data service

const ds=require('./service/dataService')

//import jswt
const jwt=require("jsonwebtoken")

//app creation

const app=express()

//convert all datas from json to js
app.use(express.json())


// middleware creation
const jwtMiddleware=(request,response,next)=>{
     try{// access data from request body
     const token=request.headers['token']

     //verify the token with secret key
     const data=jwt.verify(token,"tokenkey")

     console.log(data);

     next()
    }
    catch{
        response.status(422).json({
            status:false,
            message:"Enter valid token",
            statusCode:404
        })
    }
}
   


//  register    -   post

app.post("/register",(request,response)=>{
    const result=ds.register(request.body.acno,request.body.uname,request.body.psw)
    response.status(result.statusCode).json(result)
})

//  login   -   get

app.post("/login",(request,response)=>{
    const result=ds.login(request.body.acno,request.body.psw)
    response.status(result.statusCode).json(result)
})
//  deposit   -   patch

app.post("/deposit",jwtMiddleware,(request,response)=>{
    const result=ds.deposit(request.body.acno,request.body.psw,request.body.amnt)
    response.status(result.statusCode).json(result)
})
//  withdraw    -   patch

app.post("/withdraw",jwtMiddleware,(request,response)=>{
    const result=ds.withdraw(request.body.acno,request.body.psw,request.body.amnt)
    response.status(result.statusCode).json(result)
})


//  transaction -   get

app.get("/transaction",(request,response)=>{
    const result=ds.getTransaction(request.body.acno)
    response.status(result.statusCode).json(result)
})
//  delete  -   delete

//resolve api
// app.get("/",(request,response)=>{
//     response.send('Get method working...')
// })

// app.post("/",(request,response)=>{
//     response.send('Post method working...')
// })

// app.patch("/",(request,response)=>{
//     response.send('Patch method working...')
// })

// app.put("/",(request,response)=>{
//     response.send('Put method working...')
// })

// app.delete("/",(request,response)=>{
//     response.send('Delete method working...')
// })

//port set

app.listen(3000,()=>{
    console.log("server started at port 3000");
})
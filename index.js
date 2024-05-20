require("dotenv").config();
const express=require("express");
const { connectDb } = require("./src/config/db");
const { usersRoutes } = require("./src/api/rutas/users");
const { bookRoutes } = require("./src/api/rutas/books");

const app=express();
app.use(express.json()); 
connectDb()
app.use("/api/v1/user",usersRoutes);
app.use("/api/v1/book",bookRoutes);
app.use("*",(req,res,next)=>{
    return res.status(400).json("route not found");
})
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})

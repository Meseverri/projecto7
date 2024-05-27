require("dotenv").config();
const express=require("express");
const { connectDb } = require("./src/config/db");

const { usersRoutes } = require("./src/api/rutas/users");
const { bookRoutes } = require("./src/api/rutas/books");
const { reviewsRoutes } = require("./src/api/rutas/reviews");

const app=express();
app.use(express.json()); 
connectDb();

app.use("/api/v1/user",usersRoutes);
app.use("/api/v1/book",bookRoutes);
app.use("/api/v1/review",reviewsRoutes);


app.use("*",(req,res,next)=>{
    return res.status(400).json("route not found");
})
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    console.log(`http://localhost:${PORT}/api/v1/user`);
    console.log(`http://localhost:${PORT}/api/v1/book"`);
    console.log(`http://localhost:${PORT}/api/v1/review`);
})

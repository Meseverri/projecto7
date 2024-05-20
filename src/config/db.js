const mongoose=require("mongoose")

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.db_url);
        console.log("connected to db")

    } catch (error) {
        console.log("Error" +error)
    }
}

module.exports={
    connectDb
}
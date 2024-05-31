const mongoose=require("mongoose")

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.DB_url_production);
        console.log("connected to db")
        console.log(`
    **     **  ******   **      **  ******   ******
    ***   *** **    **  ***     ** **    ** **    **
    **** ****/**      * ****    **/**      /**      *
    ** *** **/**      * ** **   **/**      /**      *
    **     **/**      * **  **  **/** *****/**      *
    **     ** **    **  **   ** **/**    ** **    **
    **     **  ******   **    ****  *******  ****** 
`)

    } catch (error) {
        console.log("Error" +error)
    }
}

module.exports={
    connectDb
}
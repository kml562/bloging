
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
dotenv.config();

const { PORT, URL } = process.env;    

const startserver= async()=> {
    try {
       await mongoose.connect(URL)
        console.log("Connected to url")
        app.listen(PORT, () => {
            console.log(`connecting to port ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}


startserver()
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const { PORT, URL } = process.env;    


export const startserver= async(app)=> {
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
import mongoose from "mongoose";
 


export const startserver= async(app,PORT,URL)=> {
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
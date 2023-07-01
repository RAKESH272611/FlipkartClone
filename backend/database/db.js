import mongoose from "mongoose";

export const connection = async () => {
   await mongoose.connect("mongodb://0.0.0.0:27017/Flipkart",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Database Connected")
}
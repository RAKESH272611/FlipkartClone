import mongoose from "mongoose";


export const connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.ho7m9kv.mongodb.net/?retryWrites=true&w=majority`
    try{
   await mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Database Connected")
   }catch(error){
     console.log("Error while connecting the database",error.message);
   }
}
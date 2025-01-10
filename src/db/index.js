// connection to database

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDb connected host : ${connectionInstance.connection.host}`);
    }catch (error){
        console.log("MONGODB CONNECTION ERROR ", error);
        process.exit(1)
    }
}

export default connectDB
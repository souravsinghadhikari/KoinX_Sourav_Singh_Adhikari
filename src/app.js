// importing modules 
import dotenv from "dotenv";
import express from "express";
import cors from "cors"

import connectDB from "./db/index.js";
import updateCryptoInfo from './scheduler/updateCryptoInfo.js';

dotenv.config({
    path: './env'
})

const app = express();

// middlewares 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))


// monmgo db connection
connectDB()
    .then(() => {
        // upate crypto information
        updateCryptoInfo();  
        app.on("error", (error) => {
            console.log("err: ", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(` server is running at port " ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(" mongodb connection failed !! ", err);
    })
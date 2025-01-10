import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import cors from "cors"

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
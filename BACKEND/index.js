//require vs import
//require is synchronous (runs top-down, blocks execution).works in all node version
//import is asynchronous (can be statically analyzed and hoisted). not fully backward compatible with require.

import express from "express";
import { nanoid } from "nanoid";  //this is used to generate unique string ID generator, contains 26 smaller 26 upper 10 number and _ and -

import dotenv from "dotenv" // dotenv is a Node.js package that loads environment variables from a .env file into process.env.
dotenv.config("./.env") 
import path from "path";
const __dirname = path.resolve();

import connectDB from "./src/config/mongo.config.js";
import shortUrl from "./src/routes/shortUrl.route.js"; //using post route from shortUrl.route file.
import auth_routes from "./src/routes/auth.route.js";
import user_routes from "./src/routes/user.route.js"; //using post route from shortUrl.route file.
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"
const app=express();
app.use(cors({
    origin:"http://localhost:5173",//your react app 
    credentials:true,    //this allows cookies to be sent
}))

//This middleware:
//Parses incoming JSON payloads (usually from POST, PUT, or PATCH requests).
//Without this, req.body would be undefined.
app.use(express.json())

//Parses URL-encoded data (from HTML form submissions).
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(attachUser) 

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)

app.use("/api/create",shortUrl)

app.use(express.static(path.join(__dirname, "../FRONTEND/dist")));

// Fallback route: serve React index.html for any unknown route
app.use(express.static(path.join(__dirname, "../FRONTEND/dist")));

// Catch-all fallback for client-side routing
app.get("*", (req, res, next) => {
  const ext = path.extname(req.url);
  if (ext) return next(); // skip files like .js/.css
  res.sendFile(path.join(__dirname, "../FRONTEND/dist/index.html"));
});

app.use(errorHandler)

app.get("/:id", redirectFromShortUrl);



app.listen(3000,()=>{
    connectDB() //database connect ho gya hai
    console.log("server is running on http://localhost:3000/api/create")
})

//certain port numbers are restricted or reserved on Windows

//we focus on two port
// GET - Redirection 
// POST - create short URL. 
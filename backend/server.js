const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express()

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());

//routes middleware

app.use("/api/users",userRoute);

//Rotes
app.get("/", (req, res)=> {
    res.send("Home Page");
});

//error middleware
app.use(errorHandler);

//connect to DB to start server
mongoose.set('strictQuery',true);
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(PORT,() => {
            console.log(`server running on ${PORT}`)
        })
    }
    )
    .catch((err)=> console.log(err));
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require('mongoose');
const userRouter = require("./routes/userRoutes");

app.use(cors())
app.use(express.json())

require('dotenv').config();
main()
    .then(() => {
        console.log("Connection Successful with Database 📊!");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_LINK);
};

app.get("/",(req,res)=>{
    res.send("Welcome to the server!!!")
})

app.use("/users",userRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
})
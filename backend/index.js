const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to the server!")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
})
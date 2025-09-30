const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const chalk = require("chalk").default;
const routes = require("./routes/index")
const backend = express();
backend.use(express.json())
//Cross Origin Resource Sharing CORS Bodyguard at doors

backend.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

backend.use(routes)

mongoose.connect("mongodb+srv://shivansh20arora:X9lvp5iQqJMQAVnp@clustername.s1yqycb.mongodb.net/")
    .then(() => {
        console.log(chalk.green.bold("Connected to MongoDB"));
        const PORT = 5001;
            backend.listen(PORT, () => {
                console.log(chalk.blue.bold(`Server running on PORT: ${PORT}`));
            });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err)
    })
    
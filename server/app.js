const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// USED 3rd PARTY MODULES
app.use(cors());

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

// ROUTERS
const usersRouter = require("./routes/usersRouter")
app.use("/users", usersRouter)

const likesRouter = require("./routes/likesRouter")
app.use("/likes", likesRouter)

const postsRouter = require("./routes/postsRouter")
app.use("/posts", postsRouter)

app.use("/", (req, res) => {
    res.send("Welcome to the REAL Facebook dot com!")
})

app.listen(port, () => {
    console.log(`Ahoy there! Ye be listenin' to http://localhost:${port}`)
})

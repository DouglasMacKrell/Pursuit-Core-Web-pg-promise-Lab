// - /posts/all
// - /posts/:user_id
// - /posts/new

const express = require("express");
const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/facebook_db"
const db = pgp(connectionString);

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        let posts = await db.any("SELECT * FROM posts");
        res.json({
            payload: posts,
            message: "Get a load of them posts!"
        })
    } catch (error) {
        res.json({
            message: "Oops! All Errors!"
        })
        console.log(error)
    }
})

router.get("/:user_id", async (req, res) => {
    try {
        let targetRaw = req.params
        let targetLock = parseInt(targetRaw.user_id)
        console.log(targetLock)
        let targetPost = await db.any(`SELECT * FROM posts WHERE poster_id = ${targetLock}`)
        res.json({
            payload: targetPost,
            message: "Here be the posts of ONE user, ye land lubber!"
        })
    } catch (error) {
        res.json({
            message: "Oops! All Errors!"
        })
        console.log(error)
    }
})

router.post("/new", async (req, res) => {
    try {
        let insertQuery = `
        INSERT INTO posts (poster_id, body)
        VALUES($1, $2)
        `
        await db.none(insertQuery, [req.body.poster_id, req.body.body])
        res.json({
            payload: req.body,
            message: "Blast Me Barnacles! Your post has been saved!"
        })
    } catch (error) {
        res.json({
            message: "Oops! All errors!"
        })
        console.log(error)
    }
})

module.exports = router;
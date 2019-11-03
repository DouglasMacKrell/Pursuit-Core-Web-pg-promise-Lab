// - Display the number of likes of each post
// - Display users who have liked each post
// - Filter posts by the number of likes (e.g show only posts with 5+ likes)

const express = require("express");
const pgp = require("pg-promise")();
const connectString = "postgres://localhost:5432/facebook_db";
const db = pgp(connectString);

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        let likes = await db.any("SELECT body, COUNT(post_id) AS num_of_likes FROM posts JOIN likes ON posts.id = likes.post_id GROUP BY posts.id")
        res.json({
            payload: likes,
            message: "Here be all the likes on all the posts! I'm a pirate server!"
        })
    } catch (error) {
        res.json({
            message: "Oops! All Errors!"
        })
        console.log(error)
    }
})

router.get("/:post_id", async (req, res) => {
    try {
        let postId = req.params
        let parsedPostId = parseInt(postId.post_id)
        let displayUsers = await db.any(`SELECT first_name, last_name FROM likes JOIN users ON users.id = likes.liker_id WHERE post_id = ${parsedPostId}`)
        res.json({
            payload: displayUsers,
            message: "Hope this works!"
        })
    } catch (error) {
        res.json({
            message: "Oops! All Errors!"
        })
        console.log(error)
    }
})

router.get("/all/:num_of_likes", async (req, res) => {
    try {
        let numOfLikes = req.params
        let parsedNumOfLikes = parseInt(numOfLikes.num_of_likes)
        let countPosts = await db.any(`SELECT body, COUNT(post_id) AS num_of_likes FROM posts JOIN likes ON posts.id = likes.post_id GROUP BY body HAVING COUNT(post_id) > ${parsedNumOfLikes} ORDER BY COUNT(post_id) DESC`)
        res.json({
            payload: countPosts,
            message: "Here be those filtered likes, ye scurvy dog!"
        })
    } catch (error) {
        res.json({
            message: "Oops! All Errors!"
        })
        console.log(error)
    }
})

module.exports = router
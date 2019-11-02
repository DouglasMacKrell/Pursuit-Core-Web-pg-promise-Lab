const express = require("express");
const pgp = require("pg-promise")();
const connectString = "postgress://localhost:5432/facebook_db";
const db = pgp(connectString);

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        let users = await db.any("SELECT * FROM users");
        res.json({
            payload: users,
            message: "Shiver me timbers! Here's those users ye be lookin' for!"
        })
    } catch (error) {
        res.status(500);
        res.json({
            message: "Oops! All Errors!"
        })
        console.log(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        let insertQuery = `
        INSERT INTO users(first_name, last_name, age)
        VALUES($1, $2, $3)
        `
        await db.none(insertQuery, [req.body.first_name, req.body.last_name, req.body.age])
        res.json({
            payload: req.body,
            message: "Swab me poop deck! A new user has been added!"
        })
    } catch (error) {
        res.json({
            message: "Oops! All Errors!"
        })
    }
    console.log(error)
})

module.exports = router
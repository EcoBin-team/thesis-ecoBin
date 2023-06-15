
const express = require('express');
const router = express.Router();
const { login, signUp, getAll, nextSignUp, getUserById,updateUserById } = require("../controllers/users")

router.get("/getAll", getAll) // route to retrieve all users
router.put("/updateUser/:id",updateUserById) //update user by id 

router.get("/user/:id", getUserById)
router.post("/login", login) // login route
router.post("/signup", signUp) // sign up route

router.put("/nextSignup", nextSignUp)

module.exports = router


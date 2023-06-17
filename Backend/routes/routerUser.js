

const express = require('express');
const router = express.Router();
const { login, signUp, getAll, nextSignUp, getUserById,updateUserById, search } = require("../controllers/users")

// uploadImage
router.get("/getAll", getAll) // route to retrieve all users
router.put("/updateUser/:id",updateUserById) //update user by id 
router.get("/user/:id", getUserById)
router.get("/search", search)

router.post("/login", login) // login route
router.post("/signup", signUp) // sign up route

router.put("/nextSignup", nextSignUp)

module.exports = router


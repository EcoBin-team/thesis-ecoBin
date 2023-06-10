const router = require("express").Router()
const { login, signUp, getAll, uploadImage, nextSignUp } = require("../controllers/users")

router.get("/getAll", getAll) // route to retrieve all users

router.post("/login", login) // login route
router.post("/signup", signUp) // sign up route

router.put("/nextSignup", nextSignUp)

module.exports = router
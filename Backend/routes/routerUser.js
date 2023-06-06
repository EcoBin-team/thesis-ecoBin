const router = require("express").Router()
const { login, signUp, getAll } = require("../controllers/users")

router.get("/getAll", getAll) // route to retrieve all users

router.post("/login", login) // login route
router.post("/signup", signUp) // sign up route

module.exports = router
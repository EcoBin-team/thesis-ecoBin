const router = require("express").Router()
const { login, signUp, getAll, uploadImage, getUserById } = require("../controllers/users")

router.get("/getAll", getAll) // route to retrieve all users

router.get("/:id", getUserById)
router.post("/login", login) // login route
router.post("/signup", signUp) // sign up route
router.post("/upload", uploadImage)

module.exports = router
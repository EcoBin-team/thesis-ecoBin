const router = require("express").Router()
const { login, signUp, getAll ,getUserById,updateUserById} = require("../controllers/users")

router.get("/getAll", getAll) // route to retrieve all users
router.put("/updateUser/:id",updateUserById) //update user by id 
router.post("/login", login) // login route
router.post("/signup", signUp) // sign up route
router.get('/user/:id', getUserById) // get one user by id 
module.exports = router
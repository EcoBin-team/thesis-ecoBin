const router = require("express").Router()
const { getMessages } = require("../controllers/conversations")

router.get("/getMessages/:id", getMessages)

module.exports = router
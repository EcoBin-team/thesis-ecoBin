const router = require("express").Router()
const { getMessages, sendMessage } = require("../controllers/conversations")

router.get("/getMessages/:id", getMessages)

router.post("/send", sendMessage)

module.exports = router
const router = require("express").Router()
const { getAllDepots,getDepotById, searchDepot } = require("../controllers/depotController")

router.get("/depots/getAll", getAllDepots) 
router.get("/depots/:id", getDepotById)
router.get("/depots/search", searchDepot)



module.exports = router
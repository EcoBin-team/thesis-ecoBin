const router = require("express").Router()
const { getAllDepots,getDepotById, searchDepot } = require("../controllers/depotContrller")

router.get("/getAll", getAllDepots) 
router.get("/:id", getDepotById)
router.get("/search", searchDepot)



module.exports = router
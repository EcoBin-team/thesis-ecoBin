const router = require("express").Router()
const { getAllDepots,getDepotById, searchDepot } = require("../controllers/depotContrller")

router.get("/getAll", getAllDepots) 
router.get("/depot/:id", getDepotById)
router.get("/searchDepot", searchDepot)



module.exports = router
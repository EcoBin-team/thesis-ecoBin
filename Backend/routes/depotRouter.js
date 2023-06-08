const router = require("express").Router()
const { getAllDepots,getDepotById } = require("../controllers/depotContrller")

router.get("/depots", getAllDepots) 
router.get("/depots/:id", getDepotById) 



module.exports = router
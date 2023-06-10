const router = require("express").Router()
const { getAllDepots,getDepotById } = require("../controllers/depotContrller")

router.get("/getAll", getAllDepots) 
router.get("/depot/:id", getDepotById) 



module.exports = router
const router = require("express").Router()
const { getAllDepots,getDepotById , SearchDepot  } = require("../controllers/depotContrller")

router.get("/getAll", getAllDepots) 
router.get("/depot/:id", getDepotById) 

router.get("/search/:stateName", async (req, res) => {
    const stateName = req.params.stateName;
    try { const depots = await SearchDepot(stateName);
      res.json(depots);
    } catch (error) { res.status(500).json({ error: error.message }); }});
  



module.exports = router
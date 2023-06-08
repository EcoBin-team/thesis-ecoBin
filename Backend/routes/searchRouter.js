const router = require("express").Router();
const Search = require("../controllers/searchController");

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.term; // Get the search term from the query parameter

    const result = await Search(searchTerm);
    res.json([...result.states, ...result.depots, ...result.items]); // Combine states, depots, and items into a single array
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

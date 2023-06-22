const router = require("express").Router()
const followUser = require("../controllers/followController")

router.post('/users/:userAId/follow/:userBId', followUserHandler)

async function followUserHandler(req, res) {
    try {
      const { userAId, userBId } = req.params;
  
     
      await followUser(userAId, userBId);
  
      res.status(200).json({ message: 'Follow action successful' });
    } catch (error) {
      console.error('Error occurred while handling follow request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = router;

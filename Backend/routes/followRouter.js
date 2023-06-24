const router = require("express").Router()
const {followUser, unfollowUser} = require("../controllers/followController")

router.post('/users/:userId/follow/:targetUserId', async (req, res) => {
  const { userId, targetUserId } = req.params;

  try {
    const response = await followUser(userId, targetUserId);

   
    res.json(response);
  } catch (error) {
 
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:currentUserId/unfollow/:targetUserId', unfollowUser)

  module.exports = router;

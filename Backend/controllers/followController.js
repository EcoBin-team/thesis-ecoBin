require("dotenv").config()
const supabase = require("../supabase/Supabase_Connect")

 const followUser = async function(userAId, userBId) {
    try {
   
      const { data: userAData, error: userAError } = await supabase
      .from('users')
      .select('following')
      .eq('id', userAId)
      .limit(1)
      .single();

    if (userAError) {
      throw new Error(userAError.message);
    }
  
      const updatedFollowing = userAData.following ? [...userAData.following, userBId] : [userBId];
      const { error: updateFollowingError } = await supabase
        .from('users')
        .update({ following: updatedFollowing })
        .eq('id', userAId);
  
      if (updateFollowingError) {
        throw new Error(updateFollowingError.message);
      }
  
      // Get user B's current followers array
      const { data: userBData, error: userBError } = await supabase
        .from('users')
        .select('followers')
        .eq('id', userBId)
        .single();
  
      if (userBError) {
        throw new Error(userBError.message);
      }

      const updatedFollowers = userBData.followers ? [...userBData.followers, userAId] : [userAId];

      const { error: updateFollowersError } = await supabase
        .from('users')
        .update({ followers: updatedFollowers })
        .eq('id', userBId);
  
      if (updateFollowersError) {
        throw new Error(updateFollowersError.message);
      }
  
      console.log(`User ${userAId} is now following user ${userBId}.`);
    } catch (error) {
      console.error('Error occurred while following user:', error);
    }
  }
  

  module.exports = followUser
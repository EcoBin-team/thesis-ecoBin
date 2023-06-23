require("dotenv").config()
const supabase = require("../supabase/Supabase_Connect")

 const followUser = async function(userId, targetUserId) {
  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('followers, following')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error('Error fetching user data');
    }

    const followers = userData.followers || []; 
    const following = userData.following || []; 
    const updatedFollowers = [...followers, targetUserId];
    const { error: followersError } = await supabase
      .from('users')
      .update({ followers: updatedFollowers })
      .eq('id', userId);

    if (followersError) {
      throw new Error('Error updating followers list');
    }

  
    const { data: targetUserData, error: targetUserError } = await supabase
      .from('users')
      .select('following')
      .eq('id', targetUserId)
      .single();

    if (targetUserError) {
      throw new Error('Error fetching target user data');
    }

    const targetFollowing = targetUserData.following || []; 
    const updatedFollowing = [...targetFollowing, userId];
    const { error: followingError } = await supabase
      .from('users')
      .update({ following: updatedFollowing })
      .eq('id', targetUserId);

    if (followingError) {
      throw new Error('Error updating following list');
    }

   
    return { success: true, message: 'User followed successfully' };
  } catch (error) {
    
    console.error(error);
    return { success: false, message: 'Failed to follow user' };
  }
}

const unfollowUser =async  (req, res)=> {
  const { currentUserId, targetUserId } = req.params;

  try {

    const { data: currentUserData, error: currentUserError } = await supabase
      .from('users')
      .select('following')
      .eq('id', currentUserId)
      .single();

    if (currentUserError) {
      return res.status(500).json({ message: 'Failed to retrieve current user data' });
    }

    const currentUser = currentUserData;

   
    const { data: targetUserData, error: targetUserError } = await supabase
      .from('users')
      .select('followers')
      .eq('id', targetUserId)
      .single();

    if (targetUserError) {
      return res.status(500).json({ message: 'Failed to retrieve target user data' });
    }

    const targetUser = targetUserData;

    
    const isFollowing = currentUser.following && currentUser.following.includes(targetUserId);

    if (!isFollowing) {
      return res.status(400).json({ message: 'User is not following the target user' });
    }

    
    const updatedFollowing = currentUser.following.filter((id) => id !== targetUserId);


    const updatedFollowers = targetUser.followers.filter((id) => id !== currentUserId);

    const { error: updateCurrentUserError } = await supabase
      .from('users')
      .update({ following: updatedFollowing })
      .eq('id', currentUserId);

    if (updateCurrentUserError) {
      return res.status(500).json({ message: 'Failed to update current user following' });
    }

    const { error: updateTargetUserError } = await supabase
      .from('users')
      .update({ followers: updatedFollowers })
      .eq('id', targetUserId);

    if (updateTargetUserError) {
      return res.status(500).json({ message: 'Failed to update target user followers' });
    }

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to unfollow user' });
  }
}

  module.exports = {followUser , unfollowUser}
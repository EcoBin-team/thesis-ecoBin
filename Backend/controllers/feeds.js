const supabase = require("../supabase/Supabase_Connect");

const getOneFeed = async (req, res) => {
  const { id } = req.params;

  try {
    const feed = await supabase
      .from('Feeds')
      .select('*')
      .eq('id', id)
      .single();

    if (feed.error) {
      throw new Error(feed.error.message);
    }

    res.status(200).json([feed]); // Wrap the feed object in an array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllComments = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('postid', id);

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(comments || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






const getAllFeeds = async (req, res) => {
  try {
    const { data: feeds, error } = await supabase.from('Feeds').select('*');

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(feeds || []); // Return an empty array if feeds is null
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const postComment = async (req, res) => {
  const { id } = req.params;
  const { userId, commentText } = req.body;

  try {
    // Create a new comment object with the required fields
    const newComment = {
      postid: id,
      userid: userId,
      content: commentText,
    };

    // Insert the new comment into the database
    const { data: comment, error } = await supabase
      .from('comments')
      .insert(newComment);

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { getOneFeed, getAllFeeds,postComment,getAllComments };
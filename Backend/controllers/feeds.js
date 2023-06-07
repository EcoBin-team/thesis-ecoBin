const supabase = require("../supabase/Supabase_Connect")

const getOneFeed = async (req, res) => {
    const { id } = req.params;

    try {
      const feed = await supabase
        .from('items')
        .select("*")
        .eq('id', id)
        .single();

      if (feed.error) {
        throw new Error(feed.error.message);
      }

      res.status(200).json(feed);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getAllFeeds = async (req, res) => {
    try {
      const feeds = await supabase.from('items').select('*');
      
      if (feeds.error) {
        throw new Error(feeds.error.message);
      }

      res.status(200).json(feeds);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {getOneFeed ,getAllFeeds}